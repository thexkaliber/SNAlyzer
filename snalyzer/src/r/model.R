library(keras)
library(purrr)
library(dplyr)
library(readr)
wd <- file.path(getwd(),'')
setwd(wd)
sentiment_data <- list.files(path=wd,pattern = " - Labeled.csv") %>%
  map_df(~readr::read_csv(.))

sentiment_content <- data.frame(sentiment_data$contents)

#Tokenize text

tokenizer <- text_tokenizer(num_words = 1000)
tokenizer %>%
  fit_text_tokenizer(sentiment_data$contents)
save_text_tokenizer(tokenizer, "tokenizer")
fix_imbalance <- texts_to_sequences(tokenizer, sentiment_data$contents)
fix_imbalance <- pad_sequences(fix_imbalance,maxlen = 200)

#Fix Imbalance
score_label <- data.frame(sentiment_data$score, sentiment_data$label)
colnames(score_label) <- c('Score','Label')
fix_imbalance <- data.frame(fix_imbalance,score_label)

fix_imbalance_positive <- imbalance::mwmote(fix_imbalance, numInstances = 61154,classAttr = 'Label')
fix_imbalance <- dplyr::filter(fix_imbalance, !grepl("positive",Label))

fix_imbalance_negative <- imbalance::mwmote(fix_imbalance, numInstances = 61065, classAttr = 'Label')

fix_imbalance <- texts_to_sequences(tokenizer, sentiment_data$contents)
fix_imbalance <- pad_sequences(fix_imbalance,maxlen = 200)
score_label <- data.frame(sentiment_data$score, sentiment_data$label)
colnames(score_label) <- c('Score','Label')
fix_imbalance <- data.frame(fix_imbalance,score_label)

trainable_data <- rbind(fix_imbalance,fix_imbalance_positive, fix_imbalance_negative)

# Split data into training and validation sets
set.seed(257)
split <- sample(nrow(trainable_data), nrow(trainable_data) * 0.50)
train <- trainable_data[split, ]
val <- trainable_data[-split, ]


# Convert text to sequences
train_sequences <- as.list(train[,200])
val_sequences <- as.list(train[,200])

train_sequences <- keras::pad_sequences(train_sequences)
val_sequences <- keras::pad_sequences(val_sequences)



#train_sequences <- array_reshape(train_sequences, c(nrow(train_sequences),1, ncol(train_sequences)))
#val_sequences <- array_reshape(val_sequences, c(nrow(val_sequences),ncol(val_sequences), 1))
# Pad sequences
max_length <- 200

# Convert labels to categorical

train$Label[train$Label == "negative"] <- 0
val$Label[val$Label == "negative"] <- 0
train$Label[train$Label == "neutral"] <- 1
val$Label[val$Label == "neutral"] <- 1
train$Label[train$Label == "positive"] <- 2
val$Label[val$Label == "positive"] <- 2

train_labels <- keras::to_categorical(train$Label)
val_labels <- keras::to_categorical(val$Label)



# Define model
model <- keras_model_sequential()
model %>%
  layer_embedding(input_dim = 1001, output_dim = 128, input_length = 200) %>%
  layer_lstm(units = 64, dropout = 0.2, input_shape= c(max_length,128), return_sequences = TRUE) %>%
  layer_lstm(units = 64, dropout = 0.2) %>%
  layer_dense(units = 3, activation = "softmax")

# Compile model
model %>% compile(
  loss = "categorical_crossentropy",
  optimizer = "adam",
  metrics = c("accuracy")
)

model %>% summary()
# Train model
history <- model %>% fit(
  train_sequences, train_labels,
  epochs = 10,
  batch_size = 64,
  validation_data = list(val_sequences, val_labels)
)
plot(history)
# Evaluate model
model %>% evaluate(val_sequences, val_labels)

# Make predictions
predictions <- model %>% predict(val_sequences)

keras::save_model_hdf5(model, filepath = 'keras_model.h5')
