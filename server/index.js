const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost:27017/users"); //conexion a la base de datos

// analizador sintáctico del cuerpo de la solicitud (necesario para los métodos POST y PUT)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// buscar cors
const cors = require("cors");
const { userPost, userGet, loginGet } = require('./controllers/userController');
const { videoGet,  videoPost,  videoPatch,  videoDelete} = require('./controllers/playlistController');
const { profileGet, profilePost, profilePatch,    profileDelete,    profileLogin} = require('./controllers/profilesController');
app.use(cors({
  domains: '*',
  methods: "*"
}));

//se crean los endpoints
app.get("/api/users/",userGet);
app.get("/api/userLogin/",loginGet);
app.post("/api/users", userPost);

app.get("/api/playlists/",videoGet);
app.post("/api/playlists", videoPost);
app.patch("/api/playlists", videoPatch);
app.delete("/api/playlists", videoDelete);

app.get("/api/profiles/",profileGet);
app.get("/api/profileLogin",profileLogin);
app.post("/api/profiles", profilePost);
app.patch("/api/profiles", profilePatch);
app.delete("/api/profiles", profileDelete);
//se inicia en el puerto
app.listen(3001, () => console.log("Example app listening on port 3001!"))