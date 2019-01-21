# API Project: URL Shortener Microservice for freeCodeCamp

### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`.
3. When I visit the shortened URL, it will redirect me to my original link.

_Demo:_ [https://url-shortener-fcc.herokuapp.com/](https://url-shortener-fcc.herokuapp.com/)
