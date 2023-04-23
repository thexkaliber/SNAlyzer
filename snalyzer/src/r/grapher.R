library(igraph)
library(purrr)
library(dplyr)
library(jsonlite)
library(readr)
wd <- file.path(getwd(),'')
setwd(wd)
sentiment_data <- list.files(path=wd,pattern = " - Labeled.csv") %>%
  map_df(~readr::read_csv(.))

sentiment_data <- subset(sentiment_data, select = -c(X,id, contents, constituency_type))

#Create graph for 2023 - Since 1000s of nodes won't visualize properly we prune UNSTARRED nodes
sentiment_2023 <- dplyr::filter(sentiment_data, grepl("2023",date))
sentiment_2023 <- dplyr::filter(sentiment_2023, !grepl("UNSTARRED",type))

sentiment_actors <- subset(sentiment_2023, select = -c(topic, date,type, label, score) )

unique_politicians <- subset(sentiment_2023, select = -c(to, topic, date,type, label, score) )
unique_politicians <- unique_politicians %>% distinct(from, .keep_all = TRUE)
colnames(unique_politicians) <- c('id','party','state','constituency')

unique_ministries <- data.frame(unique(sentiment_actors$to))


unique_ministries$party <- 'GOI'
unique_ministries$state <- 'Republic of India'
unique_ministries$constituency <- 'Center'
colnames(unique_ministries) <- c('id','party','state','constituency')

actors <- data.frame(rbind(unique_ministries, unique_politicians))
actors$group <- as.numeric(factor(actors$party))

relations <- data.frame(sentiment_2023$from, sentiment_2023$to, sentiment_2023$topic, sentiment_2023$party, sentiment_2023$label, sentiment_2023$score)
colnames(relations) <- c('from','to','topic','party','label','score')
relations$value <- as.numeric(factor(relations$label))
g2023 <- graph_from_data_frame(relations, directed=TRUE, vertices = actors)
print(g2023)

exportGraph(g2023,"2023_all.json")

actors_current_ruling <- actors[actors$party %in% c('GOI', 'Bharatiya Janata Party'), ]

relations_current_ruling <- relations[relations$party %in% c('GOI','Bharatiya Janata Party'),]

g2023_ruling <- graph_from_data_frame(relations_current_ruling, directed = TRUE, vertices = actors_current_ruling)
print(g2023_ruling)
exportGraph(g2023_ruling,'2023_ruling.json')

actors_current_opposition <- dplyr::filter(actors, !grepl("Bharatiya Janata Party",party))
relations_current_opposition <- dplyr::filter(relations, !grepl("Bharatiya Janata Party",party))


g2023_opposition <- graph_from_data_frame(relations_current_opposition, directed = TRUE, vertices = actors_current_opposition)
print(g2023_opposition)
exportGraph(g2023_opposition,'2023_opposition.json')


sentiment_2022 <- dplyr::filter(sentiment_data, grepl("2022",date))

sentiment_2022 <- dplyr::filter(sentiment_2022, !grepl("UNSTARRED",type))

sentiment_actors <- subset(sentiment_2022, select = -c(topic, date,type, label, score) )

unique_politicians <- subset(sentiment_2022, select = -c(to, topic, date,type, label, score) )
unique_politicians <- unique_politicians %>% distinct(from, .keep_all = TRUE)
colnames(unique_politicians) <- c('id','party','state','constituency')

unique_ministries <- data.frame(unique(sentiment_actors$to))


unique_ministries$party <- 'GOI'
unique_ministries$state <- 'Republic of India'
unique_ministries$constituency <- 'Center'
colnames(unique_ministries) <- c('id','party','state','constituency')

actors <- data.frame(rbind(unique_ministries, unique_politicians))
actors$group <- as.numeric(factor(actors$party))

relations <- data.frame(sentiment_2022$from, sentiment_2022$to, sentiment_2022$topic, sentiment_2022$party, sentiment_2022$label, sentiment_2022$score)
colnames(relations) <- c('from','to','topic','party','label','score')
relations$value <- as.numeric(factor(relations$label))
g2022 <- graph_from_data_frame(relations, directed=TRUE, vertices = actors)
print(g2022)

exportGraph(g2022,"2022_all.json")

actors_current_ruling <- actors[actors$party %in% c('GOI', 'Bharatiya Janata Party'), ]

relations_current_ruling <- relations[relations$party %in% c('GOI','Bharatiya Janata Party'),]

g2022_ruling <- graph_from_data_frame(relations_current_ruling, directed = TRUE, vertices = actors_current_ruling)
print(g2022_ruling)
exportGraph(g2022_ruling,'2022_ruling.json')

actors_current_opposition <- dplyr::filter(actors, !grepl("Bharatiya Janata Party",party))
relations_current_opposition <- dplyr::filter(relations, !grepl("Bharatiya Janata Party",party))


g2022_opposition <- graph_from_data_frame(relations_current_opposition, directed = TRUE, vertices = actors_current_opposition)
print(g2022_opposition)
exportGraph(g2022_opposition,'2022_opposition.json')


sentiment_2021 <- dplyr::filter(sentiment_data, grepl("2021",date))



sentiment_2021 <- dplyr::filter(sentiment_2021, !grepl("UNSTARRED",type))

sentiment_actors <- subset(sentiment_2021, select = -c(topic, date,type, label, score) )

unique_politicians <- subset(sentiment_2021, select = -c(to, topic, date,type, label, score) )
unique_politicians <- unique_politicians %>% distinct(from, .keep_all = TRUE)
colnames(unique_politicians) <- c('id','party','state','constituency')

unique_ministries <- data.frame(unique(sentiment_actors$to))


unique_ministries$party <- 'GOI'
unique_ministries$state <- 'Republic of India'
unique_ministries$constituency <- 'Center'
colnames(unique_ministries) <- c('id','party','state','constituency')

actors <- data.frame(rbind(unique_ministries, unique_politicians))
actors$group <- as.numeric(factor(actors$party))

relations <- data.frame(sentiment_2021$from, sentiment_2021$to, sentiment_2021$topic, sentiment_2021$party, sentiment_2021$label, sentiment_2021$score)
colnames(relations) <- c('from','to','topic','party','label','score')
relations$value <- as.numeric(factor(relations$label))
g2021 <- graph_from_data_frame(relations, directed=TRUE, vertices = actors)
print(g2021)

exportGraph(g2021,"2021_all.json")

actors_current_ruling <- actors[actors$party %in% c('GOI', 'Bharatiya Janata Party'), ]

relations_current_ruling <- relations[relations$party %in% c('GOI','Bharatiya Janata Party'),]

g2021_ruling <- graph_from_data_frame(relations_current_ruling, directed = TRUE, vertices = actors_current_ruling)
print(g2021_ruling)
exportGraph(g2021_ruling,'2021_ruling.json')

actors_current_opposition <- dplyr::filter(actors, !grepl("Bharatiya Janata Party",party))
relations_current_opposition <- dplyr::filter(relations, !grepl("Bharatiya Janata Party",party))


g2021_opposition <- graph_from_data_frame(relations_current_opposition, directed = TRUE, vertices = actors_current_opposition)
print(g2021_opposition)
exportGraph(g2021_opposition,'2021_opposition.json')



sentiment_2020 <- dplyr::filter(sentiment_data, grepl("2020",date))

sentiment_2020 <- dplyr::filter(sentiment_2021, !grepl("UNSTARRED",type))

sentiment_actors <- subset(sentiment_2020, select = -c(topic, date,type, label, score) )

unique_politicians <- subset(sentiment_2020, select = -c(to, topic, date,type, label, score) )
unique_politicians <- unique_politicians %>% distinct(from, .keep_all = TRUE)
colnames(unique_politicians) <- c('id','party','state','constituency')

unique_ministries <- data.frame(unique(sentiment_actors$to))


unique_ministries$party <- 'GOI'
unique_ministries$state <- 'Republic of India'
unique_ministries$constituency <- 'Center'
colnames(unique_ministries) <- c('id','party','state','constituency')

actors <- data.frame(rbind(unique_ministries, unique_politicians))
actors$group <- as.numeric(factor(actors$party))

relations <- data.frame(sentiment_2020$from, sentiment_2020$to, sentiment_2020$topic, sentiment_2020$party, sentiment_2020$label, sentiment_2020$score)
colnames(relations) <- c('from','to','topic','party','label','score')
relations$value <- as.numeric(factor(relations$label))
g2020 <- graph_from_data_frame(relations, directed=TRUE, vertices = actors)
print(g2020)

exportGraph(g2020,"2020_all.json")

actors_current_ruling <- actors[actors$party %in% c('GOI', 'Bharatiya Janata Party'), ]

relations_current_ruling <- relations[relations$party %in% c('GOI','Bharatiya Janata Party'),]

g2020_ruling <- graph_from_data_frame(relations_current_ruling, directed = TRUE, vertices = actors_current_ruling)
print(g2020_ruling)
exportGraph(g2020_ruling,'2020_ruling.json')

actors_current_opposition <- dplyr::filter(actors, !grepl("Bharatiya Janata Party",party))
relations_current_opposition <- dplyr::filter(relations, !grepl("Bharatiya Janata Party",party))


g2020_opposition <- graph_from_data_frame(relations_current_opposition, directed = TRUE, vertices = actors_current_opposition)
print(g2020_opposition)
exportGraph(g2020_opposition,'2020_opposition.json')





exportGraph <- function(g,filename){
  #convert graph into a list
  graph <- list()
  graph$edges <- igraph::as_data_frame(g, what = "edges")
  graph$vertices <- igraph::as_data_frame(g, what="vertices")
  # polish vertices
  row.names(graph$vertices) <- NULL
  if(ncol(graph$vertices)==0) graph$vertices <- NULL #in case the

  graph$directed <- is.directed(g)
  graph$name <- g$name
  #convert list into a json
  json.content <- toJSON(graph, pretty=TRUE)
  #write json into a file
  if(!missing(filename)) {
    sink(filename)
    cat(json.content)
    sink()
  }
  #return the json in case you need it
  return(json.content)
}
