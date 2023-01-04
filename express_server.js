////////////////////////////////////////EXPRESS/////////////////////////////////////////
const express = require("express");
const app = express();
const PORT = 8080;


////////////////////////////////////////MIDDLEWARE//////////////////////////////////////
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true}));


/////////////////////////////////////////FUNCTIONS////////////////////////////////////////
function generateRandomString() {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  charactersLength = characters.length;

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};


//////////////////////////////////////////DATABASE//////////////////////////////////////
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};


/////////////////////////////////////ROUTES/////////////////////////////////////////////

//Random Practice Routes//
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});


//URLS HOMEPAGE//
app.get("/urls", (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL
  console.log("urlDatabase:", urlDatabase)
  res.redirect(`/urls/${shortURL}`);
});

//CREATE NEW URL PAGE//
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});


//SINGLE URL PAGE//
app.get("/urls/:id", (req, res) => {
  const id = req.params.id
  const longURL = urlDatabase[id]
  const templateVars = {id, longURL};
  res.render("urls_show", templateVars);
});

//SHORTURL REDIRECT//
app.get("/u/:id", (req, res) => {
  const id = req.params.id
  const longURL = urlDatabase[id];
  res.redirect(longURL);
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});