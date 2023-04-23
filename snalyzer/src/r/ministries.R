library(igraph)
library(purrr)
library(dplyr)
library(jsonlite)
library(readr)
wd <- file.path(getwd(),'labeled_data_models')
setwd(wd)
session_data <- list.files(path=wd,pattern = " - Labeled.csv") %>%
  map_df(~readr::read_csv(.))

ministry <- session_data %>% group_by(session_data$to) %>%
  summarise(Count = n()) %>%
  arrange(desc(Count))

colnames(ministry) <- c('Ministry','Value')
ministry <- subset(ministry, Value>10)



readr::write_csv(ministry,'ministry_count.csv')
