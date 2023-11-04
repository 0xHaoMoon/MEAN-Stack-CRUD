//Importiert das Express.js-Webanwendungsmodul aus einer Datei namens "app.js" im "backend"-Verzeichnis 
//und weist es der Konstanten "app" zu.
const app = require("./backend/app");
//Importiert das "debug"-Modul und erstellt einen Debug-Logger mit dem Namen "node-angular", 
//der später verwendet wird, um Serverereignisse zu protokollieren.
const debug = require("debug")("node-angular");
//Importiert das integrierte Node.js-Modul "http", das zur Erstellung von HTTP-Servern verwendet wird.
const http = require("http");

//Definiert eine Funktion namens "normalizePort", die dazu dient, 
//den Portwert zu normalisieren und in das gewünschte Format umzuwandeln. 
//Wenn der Wert ein gültiger Port ist, wird er als Ganzzahl zurückgegeben, andernfalls 
//wird der ursprüngliche Wert beibehalten oder "false" zurückgegeben.
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};


//Definiert eine Funktion namens "onError", die aufgerufen wird, 
//wenn ein Fehler im Server auftritt. Sie überprüft den Fehlercode und 
//gibt eine Fehlermeldung aus, je nachdem, welche Art von Fehler aufgetreten ist.
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Definiert eine Funktion namens "onListening", die aufgerufen wird, 
//wenn der Server erfolgreich gestartet wurde. Sie gibt die Adresse und den Port aus, 
//auf denen der Server lauscht.
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

//Ruft die "normalizePort"-Funktion auf, um den Portwert aus der Umgebungsvariable "PORT" 
//oder standardmäßig auf "3000" festzulegen und weist ihn der Konstanten "port" zu.
const port = normalizePort(process.env.PORT || "3000");

//Setzt den Portwert in der Express.js-Anwendung auf den zuvor festgelegten Wert.
app.set("port", port);

//Erstellt einen HTTP-Server und verwendet die Express.js-Anwendung "app" als Request-Handler.
const server = http.createServer(app);

//Fügt einen Event-Listener hinzu, um auf Serverfehler zu reagieren und die "onError"-Funktion aufzurufen,
// wenn ein Fehler auftritt.
server.on("error", onError);

//Fügt einen Event-Listener hinzu, um auf das erfolgreiche Starten des Servers
// zu reagieren und die "onListening"-Funktion aufzurufen.
server.on("listening", onListening);

//Startet den HTTP-Server, der auf dem zuvor festgelegten Port lauscht.
server.listen(port);
