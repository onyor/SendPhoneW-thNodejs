const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { Auth } = require('@vonage/auth');
const { Vonage } = require('@vonage/server-sdk');

// express app created
const app = express();

// ejs
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static dosyaların dizinini belirtme
app.use('/',express.static(__dirname + "/static"));

//nexmo objsi oluşturma

const credentials = new Auth({
    apiKey: "855efea7",
    apiSecret: "hVAVhkTn9lEJBS78"
});
const options = {};
const vonage = new Vonage(credentials, options);

// route
app.get("/", (req, res) => {
  res.render("index");
});
    
//main.js'ten ggele datayı server kısmında yakalamak
app.post("/", async (req, res) => {
    const from = "Vonage APIs";
    const to = req.body.number;
    const text = req.body.text;
    
    await vonage.sms
      .send({ to, from, text })
      .then((resp) => {
        console.log("Message sent successfully");
        console.log(resp);
      })
      .catch((err) => {
        console.log("There was an error sending the messages.");
        console.error(err);
      });
});

// create port
const port = 3000;

const server = app.listen(3000, () => {
  console.log(`Server ${port} initilazion..`);
});


