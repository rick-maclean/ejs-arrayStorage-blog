//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the full build.
var _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

//tell express to use bodyParser to parse the html
app.use(bodyParser.urlencoded({extended: true}));

// tell express where the static files are located, i.e. css and images
// had to add this for static files: css/style.css and images/someImage.jpg files to be found
app.use(express.static("public"));


//modification to have it run on hosting service
const PORT = process.env.PORT || 3000;
// app.listen(PORT, function() {
//   console.log('Server started on port ${PORT}');
// });
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


app.get('/', function (req, res) {
  console.log('the HOME page was accessed');
  // console.log("all posts are...")
  // console.log(posts);
  console.log('posts.length  '+ posts.length);

  
  res.render('home', {  
    homeStartingContent : homeStartingContent,
    posts: posts
      } );    
});

app.get('/about', function (req, res) {
  console.log('the ABOUT page was accessed');
  
  res.render('about', {  
    aboutContent : aboutContent
      } );    
});

app.get('/contact', function (req, res) {
  console.log('the contact page was accessed');
  
  res.render('contact', {  
    contactContent : contactContent
      } );    
});


app.get('/post', function (req, res) {
  console.log('the POST page was accessed');
  
  res.render('post', {  
      } );    
});

app.get('/post/:postTitle', function (req, res) {
  console.log('the POST page was accessed');
  console.log("Post Title is: "+ req.params.postTitle);

  let foundPost = posts.find(element => 
      //NOTE: here we are using the loDash library
      _.lowerCase(element.title) === 
      _.lowerCase(req.params.postTitle) );
  //console.log(foundPost);
  if (foundPost === undefined) {
    foundPost = {
      title: req.params.postTitle,
      postBody: "there is no post with this title..."
    };
  }
  //console.log(foundPost);
  
  res.render('post', {  foundPost : foundPost
      } );    
});

app.get('/compose', (req, res) => {
  console.log('the compose page was accessed');
  
  res.render('compose', {  
      } );    
});

let posts = []; //used to save all the posts
app.post('/compose', function (req, res) {
  console.log('=====================the compose post operation was done=================');
  // console.log('req.body.postTitle: ', req.body.postTitle);
  // console.log('req.body.postBody: ', req.body.postBody);

  const newPost = {
    title: req.body.postTitle,
    postBody: req.body.postBody
  };
  posts.push(newPost);
  // console.log(newPost);

  res.redirect("/");
});




