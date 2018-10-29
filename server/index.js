const express = require('express'),
      app = express(),
      bodyParser = require("body-parser"),
      jc = require('./controllers/jokesController'),
      port = 4000;


app.use(bodyParser.json());

app.get("/jokes", jc.getJokes);
app.post("/jokes", jc.addJoke);
app.put("/jokes/:id", jc.editJoke);
app.delete("/jokes/:id", jc.deleteJoke);

app.listen(port, () => {console.log("Jokes are running on " + port)})