const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();

app.use(morgan('dev'))
app.get("/", (req, res) => {
  
  const post = postBank.list();

  const html = `!<DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
  </head>
  <body>
  <ul>
    ${post.map(post => `<li>${/* */ }</li>`)}
  </ul>
  </body>
  </html>`

  res.send(html)
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);

 
});
