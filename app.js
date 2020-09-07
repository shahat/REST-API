/* this is a study of how to build api  */

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
/* use app  */
const app = express();
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
/* connect mongoose to our local database called wekidb  */
mongoose.connect("mongodb://localhost:27017/wekidb");
app.set('view engine', 'ejs');
/*  */
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//TODO
/* create a schema */
const articleSchema= {
    title:String ,
    content : String 
};
/* create a modle  */
const Article = mongoose.model("Article",articleSchema);

/************************************** targeting all articles routs*********************************** */
app.route("/articles")
.get(function(req,res){/* Read  */
    Article.find(function(err,foundArticles){/* this makes you to see the err it is it found  */
     !err ? res.send(foundArticles) : res.send(err) ;
    })
  })
.post(function(req,res){//post data into data base 
    const mohamed_elsh_art = new Article ({
        title:req.body.title,
       content: req.body.content});
    mohamed_elsh_art.save(function(err){
    !err ? res.send("successfully added to a new article  "): res.send(err);
       });
     })
.delete(function(req,res){ //delete data from data base 
    Article.deleteMany(function(err){ /* this makes you to see the err it is it found  */
    !err ?  res.send(" successfully delete all articles") : res.send(err)
    })
})

/************************************** targeting specific article route  routs*********************************** */
app.route("/:articleTitle")
.get(function(req,res){
    Article.findOne({title:req.params.articleTitle},function(err,foundarticle){
        foundarticle ? res.send(foundarticle):res.send("no articles matchise this title was founded")
    })
})
.put(function(req,res){
// the put request update the entire content by that you sent 
    Article.update( 
        {title:req.params.articleTitle},
        {title:req.body.title,content:req.body.content},
        {overwrite:true},
        err => !err ? res.send("successfully updated article "):res.send(err)
        
    )
})
.patch(function(req,res){
    // the patch request update the  content by that you sent 
        Article.update( 
            {title:req.params.articleTitle},
            {$set:req.body},
            err=> !err ? res.send("successfully patched "): res.send(err)
            
        )
    })
.delete(function(req,res){
    // the put request update the entire content by that you sent 
        Article.deleteOne( 
            {title:req.params.articleTitle},
            err => !err ? res.send("successfully DELETE article "):res.send(err)
            
        )
    })    
/** this is like the radio channel haha */
app.listen(3000, function() {
  console.log("Server started on port 3000");
});