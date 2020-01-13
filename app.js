// npm install --save express ejs request
// http://www.omdbapi.com/

const  express = require("express");
const app = express();
const request = require("request");


app.set("view engine", "ejs");

app.listen( 3000, function() { 
    console.log("Server has started");
})



app.get("/", function(req,res){
    res.render("search")
})

// Make sure we use different name for req, res.
app.get("/results", function(req,res) {
    let query = req.query.search;
    let search = req.params.search;     // from form in search.ejs
    request("https://jsonplaceholder.typicode.com/users", function(error, response, body){
    //request("http://www.omdbapi.com/?t=california&plot=full&apikey=thewdb", function(error, response, body){
        if (!error && res.statusCode == 200) {
            //res.send(body);
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
        else
        {
            console.log(error);
            res.send("ERROR");
        }
    });
    //res.send("Hello it works");
});