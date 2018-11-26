var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var inquirer = require("inquirer");

var choice = process.argv[2];
var firstinput = process.argv[3];

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

var client = Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret,
})


inquirer.prompt([
  {
  type: "list",
  message: "Whats method would you like to choose?",
  choices: ["spotify-this-song", "movie-this", "do-what-it-says"],
  name: "methods"
}
]).then(function(pick)
{
  
  if (pick.methods == "spotify-this-song"){
  var listofsongs=[];
  inquirer.prompt([
    {
        type: "input",
        message: "What Song would you like to search for?",
        name: "song"
    }

]).then(function (response) {
  console.log(response.track)
  var firstinput=response.track;
  var songtrack;

  if (firstinput === false) {
    songtrack = "The Sign";
  }
  else {
    songtrack = firstinput;
  }
  
  spotify.search({ type: 'track', query: songtrack }, function (err, data) {
    var songs=data.tracks.items;
    for(var item in songs){
       listofsongs.push(songs[item].name);
    }

    inquirer.prompt([
      {
          type: "list",
          message: "Songs Related to your search?",
          choices: listofsongs,
          name: "songs",
      }
  ]).then(function (inquirerResponse) {
    console.log(listofsongs.indexOf(inquirerResponse.songs));
   var index=listofsongs.indexOf(inquirerResponse.songs)
   var name=data.tracks.items[index].name;
    var link=data.tracks.items[index].preview_url;
    var artists=data.tracks.items[index].artists[0].name;
    if (err) {
      return console.log('Error occurred');
    }
    console.log(
      "Song Name:" + name,
      "Preview Link:" +link,
      "Artists:" + artists
      )
  });
})
})
}


// movie details
else if  (pick.methods == "movie-this") {
  inquirer.prompt([
    {
        type: "input",
        message: "What Movie Do u want to Search?",
        name: "name"
    }

]).then(function (inquirerResponse) {
  console.log(inquirerResponse.name)
  var firstinput=inquirerResponse.name;
  console.log(firstinput);
  var movieName;
  console.log(movieName);
  if (firstinput === false) {
    movieName = "Mr.Nobody";
  }
  else {
    movieName = firstinput;
    console.log(movieName);
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function (error, response, body) {
    if (!error) {
      console.log(
      "Movie Title: " + JSON.parse(body).Title,
      "Release Year: " + JSON.parse(body).Year,
      "IMDB Ratings: " + JSON.parse(body).imdbRating,
      "Rotten Tomatoes Ratings: " + JSON.parse(body).tomatoRating,
      "Language: " + JSON.parse(body).Language,
      "Plot: " + JSON.parse(body).Plot,
      "Actors: " + JSON.parse(body).Actors
      )
    }
    else {
      console.log('Error occurred.')
    }
  })
})
}
else if (select.selections == "do-what-it-says") {
  fs.readFile('random.txt', "utf8", function(error, data){
    var text = data.split(',');
    console.log(text);
    spotify.search({ type: 'track', query:txt[1]}, function (err, data) {
    
      if (err) {
        return console.log(err);
      }
      console.log(
        "Song Name:" + data.tracks.items[0].name,
        "Preview Link:" + data.tracks.items[0].preview_url,
        "Artists:" + data.tracks.items[0].artists[0].name,
      )
    });
  })
}; 
})