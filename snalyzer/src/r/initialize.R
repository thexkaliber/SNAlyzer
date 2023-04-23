library(opencpu)
ocpu_start_server(
  port = 5656,
  root = "/ocpu",
  workers = 2,
  preload = NULL,
  on_startup = NULL,
  no_cache = FALSE
)

ocpu_start_app()
