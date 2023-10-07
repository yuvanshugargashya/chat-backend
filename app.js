const express = require("express");
require("./models/User");
require("./models/Chatroom");
require("./models/Message");
require("./controllers/chatroomController");
require("./controllers/userController");

require("./handlers/errorHandlers");
require("./middlewares/auth");
require("./routes/chatroom");
require("./routes/user");



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross Origin
app.use(require("cors")());

//Bring in the routes
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
