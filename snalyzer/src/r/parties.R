library(igraph)
library(purrr)
library(dplyr)
library(jsonlite)
library(readr)
wd <- file.path(getwd(),'labeled_data_models')
setwd(wd)
session_data <- list.files(path=wd,pattern = " - Labeled.csv") %>%
  map_df(~readr::read_csv(.))

party <- session_data %>% group_by(session_data$party) %>%
  summarise(Count = n()) %>%
  arrange(desc(Count))

colnames(party) <- c('Party','Value')
party <- dplyr::filter(party, !grepl("Bharatiya Janata Party",Party))
party <- party[1:20,]



readr::write_csv(party,'opposition_questions.csv')


#National Parties vs Regional Party - Question Ratio
party <- session_data %>% group_by(session_data$party) %>%
  summarise(Count = n()) %>%
  arrange(desc(Count))
colnames(party) <- c('Party','Value')

national_parties <- party[party$Party %in% c('Aam Aadmi Party','Bhajun Samaj Party','Bharatiya Janata Party','Communist Party of India (Marxist)','Indian National Congress',"National People's Party"),]
national_parties_rate <- sum(national_parties$Value)
colnames(national_parties) <- c('Party','Value')
regional_parties <- party[!(party$Party %in% c('Aam Aadmi Party','Bhajun Samaj Party','Bharatiya Janata Party','Communist Party of India (Marxist)','Indian National Congress',"National People's Party")),]
colnames(regional_parties) <- c('Party','Value')
regional_parties_rate <- sum(regional_parties$Value)

