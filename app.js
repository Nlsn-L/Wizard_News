const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();
const path = require('path');
const postList = require("./views/postList")
const postDetails = require("./views/postDetails")


app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('dev'))

app.use("/",require("./views/postList"))

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

 app.get('/posts/:id',(req,res) => {
  const id = req.params.id
  const post = postBank.find(id)
  res.send(postDetails(post))

 })


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);

});
