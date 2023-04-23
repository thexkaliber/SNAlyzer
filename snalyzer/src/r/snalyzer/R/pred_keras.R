prediction_keras <- function(data='') {
  library(reticulate)
  library(keras)
  predict_data <- format(data)
  tokenizer <- load_text_tokenizer("C:/Users/user/snalyzer/snalyzer/src/r/snalyzer/labeled_data_models/tokenizer")
  model <- load_model_hdf5('C:/Users/user/snalyzer/snalyzer/src/r/snalyzer/labeled_data_models/keras_model.h5')
  embedding <- texts_to_sequences(tokenizer, predict_data)
  pad_embedding <- pad_sequences(embedding, maxlen = 200)
  return_pred_keras <- model %>% predict(pad_embedding)
  colnames(return_pred_keras) <- c('LABEL_0','LABEL_1','LABEL_2')
  rownames(return_pred_keras) <- c('score')
  label <- colnames(return_pred_keras)[apply(return_pred_keras,1,which.max)]
  score <- as.numeric(max(return_pred_keras))
  return_pred_keras <- as.list(c(label,score))
  return(return_pred_keras)
}
