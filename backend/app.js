//Importiert das Modul "express", das zur Erstellung von Webanwendungen und Routen
//in Node.js verwendet wird.
const express = require("express");

//Importiert das Modul "body-parser", das für das Verarbeiten von HTTP-Anfragen
//und Extrahieren von Daten aus dem Anfragekörper verwendet wird.
const bodyParser = require("body-parser");

//Importiert das Modul "mongoose", das als ODM (Object Data Modeling) für MongoDB verwendet wird,
// um die Interaktion mit der MongoDB-Datenbank zu erleichtern.
const mongoose = require("mongoose");

//Importiert das Modul "Post" aus der Datei "post.js" im Verzeichnis "models".
//Dies legt nahe, dass "Post" ein Modell für Beiträge ist und in diesem Code verwendet wird.
const Post = require("./models/post");

//Erstellt eine Express-Anwendung und weist sie der Konstanten "app" zu,
// um alle Routen und Middleware zu konfigurieren.
const app = express();

//Verbindet die Anwendung mit einer MongoDB-Datenbank,
//basierend auf der angegebenen Verbindungs-URL. Hier wird eine Verbindung zur Datenbank hergestellt
//und eine Erfolgsmeldung oder eine Fehlermeldung ausgegeben.
mongoose
  .connect(
    "mongodb+srv://haotruong:demo@tutorial.epiyt3a.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connected to database failed!");
  });

//Konfiguriert die Express-Anwendung, um JSON- und URL-codierte Daten aus Anfragen
//zu verarbeiten, was für das Parsen von Anfragedaten hilfreich ist.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Konfiguriert Header-Einstellungen, um CORS (Cross-Origin Resource Sharing) zu ermöglichen.
// Dies erlaubt Anfragen von verschiedenen Domains.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//Dies definiert eine POST-Anfrage-Route für Anfragen an "/api/posts".
// Das bedeutet, dass diese Funktion aufgerufen wird, wenn eine POST-Anfrage an diese URL gesendet wird.
app.post("/api/posts", (req, res, next) => {
  //Hier wird ein neues Objekt "post" erstellt, das auf das Modell "Post" zurückgeht.
  // Dieses Modell wurde zuvor importiert. Die Daten für den Beitrag (Titel und Inhalt)
  // werden aus dem Anfragekörper (req.body) entnommen, der die von einem Client (z.B. einem Formular)
  //gesendeten Daten enthält. Mongoose
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  //Dieser Codeabschnitt zeigt die Verwendung der .save()-Methode, um ein neues Dokument 
  //(in diesem Fall einen Beitrag) in der Datenbank zu speichern. Nachdem die Speicheroperation 
  //abgeschlossen ist, wird die .then()-Funktion aufgerufen, um das Ergebnis (das gespeicherte Dokument) 
  //zu verarbeiten.
  post.save()
  //Nachdem der Beitrag erfolgreich in der Datenbank gespeichert wurde, wird eine HTTP-Antwort an
  // den Client gesendet. Der Statuscode 201 steht für "Created" und signalisiert, dass der Beitrag 
  //erfolgreich erstellt wurde. Die Antwort ist ein JSON-Objekt, das eine Erfolgsmeldung enthält
  // (der Beitrag wurde erfolgreich hinzugefügt) und die ID des erstellten Beitrags (createdPost._id).
  // Dies ermöglicht dem Client, die ID des neu erstellten Beitrags zu erhalten, was oft für die spätere
  // Bearbeitung oder Anzeige des Beitrags erforderlich ist.
  .then(createdPost =>{
  res.status(201).json({
    message: "Post added succesfully",
    postId: createdPost._id
  });
  });

  console.log(post);


});



//Dies definiert eine GET-Anfrage-Route für Anfragen an "/api/posts".
// Das bedeutet, dass diese Funktion aufgerufen wird, wenn eine GET-Anfrage an diese URL gesendet wird.
app.get("/api/posts", (req, res, next) => {
  //Hier wird die Methode .find() auf das "Post"-Modell angewendet.
  //Dies löst eine Datenbankabfrage aus, um alle vorhandenen Beiträge aus der Datenbank abzurufen.
  //Das Ergebnis dieser Abfrage wird in der .then()-Funktion verarbeitet.
  Post.find().then((documents) => {
    console.log(documents);
    //Nachdem die Beiträge erfolgreich aus der Datenbank abgerufen wurden,
    //wird eine HTTP-Antwort an den Client gesendet. Der Statuscode 200 steht für "OK"
    //und signalisiert, dass die Anfrage erfolgreich war. Die Antwort enthält ein JSON-Objekt mit einer Erfolgsmeldung
    //und den abgerufenen Beiträgen, die an den Client gesendet werden. Der Client kann dann die abgerufenen Beiträge verwenden oder anzeigen.
    res.status(200).json({
      message: "posts fetched succesfully",
      posts: documents,
    });
  });
});


//Dies definiert eine DELETE-Anfrage-Route für Anfragen an "/api/posts/:id". 
//Das :id in der Route ist ein Parameter, der verwendet wird, um eine bestimmte Ressource 
//(in diesem Fall einen Beitrag) anhand ihrer eindeutigen ID zu identifizieren. 
//Diese Funktion wird aufgerufen, wenn eine DELETE-Anfrage an diese URL mit einer spezifischen ID 
//gesendet wird.
app.delete("/api/posts/:id", (req, res, next) => {
    //Hier wird die Methode .deleteOne() auf das "Post"-Modell angewendet. 
    //Sie löscht den Beitrag mit der angegebenen ID, die aus dem req.params.id-Parameter extrahiert wird.
    // Das Ergebnis dieser Löschoperation wird in der .then()-Funktion verarbeitet.
    Post.deleteOne({_id: req.params.id})
    .then(result=>{
      console.log(result);
      res.status(200).json({
        message: "Post deleted",
      });
    })
});

//Exportiert die gesamte Express-Anwendung, damit sie in anderen Teilen der Anwendung verwendet werden kann.
module.exports = app;
