library(purrr)
library(dplyr)
library(jsonlite)
library(readr)
library(tm)
library(tidytext)
wd <- file.path(getwd(),'labeled_data_models')
setwd(wd)
wordcloud <- list.files(path=wd,pattern = " - Labeled.csv") %>%
  map_df(~readr::read_csv(.))

wordcloud <- subset(wordcloud, select = -c(X,id, contents, from, to,contents, type, party, state, constituency, constituency_type))



count_words <- function(text) {
  # convert text to lowercase
  text <- tolower(text)
  # split text into words
  words <- strsplit(text, "\\W+")
  # remove stop words
  stop_words <- stopwords("english")
  words <- words[[1]][!words[[1]] %in% stop_words]
  # count word occurrences
  word_counts <- table(words)
  # return a data frame containing word and count columns
  data.frame(word = names(word_counts), count = as.numeric(word_counts), stringsAsFactors = FALSE)
}

# apply the count_words function to the text column of the data frame
word_count <- lapply(wordcloud$topic, count_words)

# combine the resulting list of data frames into a single data frame
word_count <- do.call(rbind, word_count)

# aggregate the word counts by summing them
word_count <- aggregate(count ~ word, data = word_count, sum)

# sort the data frame by count in descending order
word_count <- word_count[order(-word_count$count), ]

# print the resulting data frame
print(word_count)

colnames(word_count) <- c('word','count')
word_cloud_export <- subset(word_count, count>500)


readr::write_csv(word_cloud_export,'./labeled_data_models/wordcloud.csv')
write_json(word_cloud_export, './labeled_data_models/wordcloud.json')
