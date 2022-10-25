const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();
let options = {}

const path = require('path');
const { nextTick } = require("process");
app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('dev'))
app.get("/", (req, res) => {
  
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      <ul>
        ${post.map(post => `<li>
          <div>
          <span class='news-position'>${post.id}.</span>${post.title}
          <small>(by ${post.name})</small>
          </div>
          <small class='news-info'>
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </li>`).join('')}
      </ul>
    </div>
  </body>
</html>`

  res.send(html)
});

app.get('/posts/:id', (req, res,next) => {
  const id = req.params.id
  const post = postBank.find(id)
  if (!post.id) {
    // If the post wasn't found, just throw an error
    throw new Error('Not Found')
    
  } else {
    next()
  }
}) 
  
  
  app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
   </head>
   <body>
   <div class="news-list">  
   <header><img src="/logo.png"/>Wizard News</header>
     <div class='news-item'>
     <p>     
       <span class="news-position">${post.id}. ▲</span>${post.title}
       <small>(by ${post.name})</small>
     </p>
     <p>${post.content}</p>
     <small class="news-info">
       ${post.upvotes} upvotes | ${post.date}
     </small>
   </div>
    </div>
   </body>
  </html>`
  res.send(html);
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);

 
});
