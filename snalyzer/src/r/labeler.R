#Importing
library(reticulate)
library(tm)
library(SnowballC)
transformers <- reticulate::import("transformers")
session_data <- read.csv("20s Sessions.csv")
session_question_content <- session_data$contents

#Storing uncleaned data
ques_corpus_uncleaned <- as.list(session_question_content)

#Cleaning - Cleaning not required for BERT Models
ques_corpus <- VCorpus(VectorSource(session_question_content))

ques_corpus_cleaned <- tm_map(ques_corpus,
                              content_transformer(removePunctuation))
ques_corpus_cleaned <- tm_map(ques_corpus_cleaned, removeNumbers)
ques_corpus_cleaned <- tm_map(ques_corpus_cleaned, content_transformer(tolower))
ques_corpus_cleaned <- tm_map(ques_corpus_cleaned
                              , content_transformer(removeWords)
                              , c(stopwords("english"),"a","b","c","d","e","f","g","will","minister","pleased","state","thereof","details","therefor","reasons"))
ques_corpus_cleaned <- tm_map(ques_corpus_cleaned, stripWhitespace)

ques_corpus_cleaned <- data.frame(text = unlist(sapply(ques_corpus_cleaned,
                                                       `[`, "content")), stringsAsFactors = FALSE)
ques_corpus_cleaned <- as.list(ques_corpus_cleaned$text)

#Model Definition
model_path <- "cardiffnlp/twitter-xlm-roberta-base"
labeling_model <- transformers$pipeline(task = "sentiment-analysis",
                                        model = model_path,
                                        tokenizer = model_path)
#Cleaned Data + Model results

iteration_count <- 1
output_label <- data.frame('label')
colnames(output_label) <- 'label'
output_score <- data.frame('score')
colnames(output_score) <- 'score'
for(items in ques_corpus_cleaned)
{
  print(iteration_count)
  output <- labeling_model(items)
  output_label[nrow(output_label)+1,] <- unlist(sapply(output,`[`,"label"))
  output_score[nrow(output_score)+1,] <- unlist(sapply(output,`[`,"score"))
  iteration_count <- iteration_count + 1
}
output_label<- subset(output_label, label!="label")
output_score <- subset(output_score, score!="score")
row.names(output_label) <- NULL
row.names(output_score) <- NULL

#Uncleaned Data + Model Results


iteration_count <- 1
output_label_ul <- data.frame('label')
colnames(output_label_ul) <- 'label'
output_score_ul <- data.frame('score')
colnames(output_score_ul) <- 'score'
for(items in ques_corpus_uncleaned)
{
  print(iteration_count)
  output <- labeling_model(items)
  output_label_ul[nrow(output_label_ul)+1,] <- unlist(sapply(output,`[`,"label"))
  output_score_ul[nrow(output_score_ul)+1,] <- unlist(sapply(output,`[`,"score"))
  iteration_count <- iteration_count + 1
}
output_label_ul<- subset(output_label_ul, label!="label")
output_score_ul <- subset(output_score_ul, score!="score")
row.names(output_label_ul) <- NULL
row.names(output_score_ul) <- NULL

df2csv <- data.frame(session_data, output_score_ul,output_label_ul,)

readr::write_csv(df2csv,'./labeled_data_models/20s Session - Labeled.csv')


