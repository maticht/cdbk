const express = require('express');
const rout = require('./router');
const routPosts = require('./postsRouter');
require("dotenv").config();
const cors = require("cors");
const app = express();
const userRoutes = require("./models/users");
const userAuth = require("./models/auth");
const userUpdate = require("./models/update");
const userUpdatePhoto = require("./models/uploadPhoto");
const saveUser = require("./models/savedUsers")
const unSaveUser = require("./models/unSaveUser")
const getFavoritesUsers = require("./models/getFavoriteUsers")
const uploadAdditionalImage = require("./models/uploadAdditionalImage")
const connection = require("./db");

connection();

app.use(cors());
app.use(express.json());
app.use(rout);
app.use(routPosts);
app.use("/users", userRoutes);
app.use("/auth", userAuth);
app.use("/update", userUpdate);
app.use("/update", userUpdate);
app.use("/uploadPhoto", userUpdatePhoto);
app.use("/saveUser", saveUser);
app.use("/unSaveUser", unSaveUser);
app.use("/getFavoritesUsers", getFavoritesUsers);
app.use("/uploadAdditionalImage", uploadAdditionalImage);



const PORT = 8080;
app.listen(PORT,() => console.log(`Listening on port ${PORT}...`));
