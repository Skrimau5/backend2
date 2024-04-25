const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost:27017/proyecto");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
const sendSMS = require('./services/smsService');
const keyGet = require('./services/keyService');
const sendEmail = require('./services/emailService');
const { userPost,activateUser, userGet, loginGet } = require('./controllers/userController');
const { subPost, subGet, subPatch, subDelete} = require('./controllers/subsController');
const { collectionDelete, collectionGet, collectionPatch, collectionPost} = require('./controllers/collectionController');
const { videoGet,  videoPost,  videoPatch,  videoDelete} = require('./controllers/playlistController');
const { childrenGet,  childrenPost,  childrenPatch,  childrenDelete, childrenLogin} = require('./controllers/childrenController');

app.use(cors({
  domains: '*',
  methods: "*"
}));
app.post('/api/send-sms', async (req, res) => {
  try {
      const { to, body } = req.body;

      // Llamar a la función de envío de mensajes de texto
      const result = await sendSMS(to, body);

      res.status(200).json({ message: result });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post("/api/send-email", async (req, res) => {
  try {
      const { to, subject, text } = req.body;

      // Llamar a la función de envío de correo electrónico
      const result = await sendEmail(to, subject, text);

      res.status(200).json({ message: result });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get("/api/key/",keyGet);

app.get("/api/users/",userGet);
app.get("/api/userLogin/",loginGet); 
app.post("/api/users", userPost);
app.patch("/api/users", activateUser);

app.get("/api/videos/",videoGet);
app.post("/api/videos", videoPost);
app.patch("/api/videos", videoPatch);
app.delete("/api/videos", videoDelete);

app.get("/api/subs/",subGet);
app.post("/api/subs", subPost);
app.patch("/api/subs", subPatch);
app.delete("/api/subs", subDelete);

app.get("/api/collections/",collectionGet);
app.post("/api/collections", collectionPost);
app.patch("/api/collections", collectionPatch);
app.delete("/api/collections", collectionDelete);

app.get("/api/childrens/",childrenGet);
app.get("/api/childrenLogin",childrenLogin);
app.post("/api/childrens", childrenPost);
app.patch("/api/childrens", childrenPatch);
app.delete("/api/childrens", childrenDelete);

app.listen(3001, () => console.log(`Example app listening on port 3001!`))