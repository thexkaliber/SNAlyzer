prediction_transformer <- function(data='') {
  library(reticulate)
  transformers <- reticulate::import("transformers")
  predict_data <- format(data)
  model_path <- "cardiffnlp/twitter-xlm-roberta-base"
  labeling_model <- transformers$pipeline(task = "sentiment-analysis",
                                          model = model_path,
                                          tokenizer = model_path)
  return_pred_transformers <- labeling_model(predict_data)
  return(return_pred_transformers)
}
