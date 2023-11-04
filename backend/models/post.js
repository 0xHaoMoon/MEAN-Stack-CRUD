
//Diese Zeile importiert die Mongoose-Bibliothek. 
//Mongoose ist eine JavaScript-Bibliothek, die eine Verbindung zwischen MongoDB 
//und der JavaScript-Laufzeitumgebung Node.js herstellt.
const mongoose = require('mongoose');

//Diese Zeile erstellt ein Schema für Posts. 
//Ein Schema definiert die Struktur von Dokumenten in MongoDB. 
//In diesem Fall definiert das Schema zwei Felder: title und content. 
//Beide Felder sind vom Typ String und sind erforderlich.
const postSchema = mongoose.Schema({
    title: { type: String, required: true},
    content: {type: String, required: true}
});

//Diese Zeile exportiert ein Modell für Posts. 
//Ein Modell ist eine JavaScript-Klasse, die eine Verbindung zu einem Dokument in 
//einer MongoDB-Datenbank herstellt. In diesem Fall stellt das Modell eine Verbindung zu 
//Dokumenten vom Typ Post in der MongoDB-Datenbank her.
module.exports = mongoose.model('Post',postSchema);
