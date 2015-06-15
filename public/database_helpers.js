var mysql = require('mysql');
var express = require('express');
var javascripthelp = require('./js/functionHelpers.js')

var connection = mysql.createConnection({
    host        : 'localhost',
    port        :  3306,
    user        : 'root',
    password    : '',
    database    : 'live',
    multipleStatements: true
});


exports.checkDbArtist = function(req,res,next){
  
  var newArtist = [req.query.artistname.replace("+"," ")];
  
  connection.query('SELECT * FROM artist WHERE artist_name = ?', 
  newArtist, function(err, rows,fields){
    if(rows.length != 0){
      var artistData = [rows[0]];
      
      connection.query('SELECT * FROM reviews WHERE artist_id = ?',artistData[0].artist_id,function(err,result){
        artistData.push(result) 
        res.send(artistData)
      })
    }
    else{
      res.send("No data")
    }
  })
}

exports.insertDb = function(req,res,next){
  var artistName = req.body.artist_name || "";
  var artistGenre = javascripthelp.capital(req.body.artist_genre) || "";
  var artistImg = req.body.artist_imageurl || "";
  var artistBio = req.body.artist_bio.match( /[^\.!\?]+[\.!\?]+/g ).splice(0,4).join("") || "";
  
  console.log(artistName)
  connection.query('INSERT INTO ?? SET ?', ['artist',{artist_name: artistName,artist_genre: artistGenre, artist_imageurl:artistImg,artist_bio:artistBio}], function(err, result,rows){
      if (!err){
        res.send(artistName);
      } else{
        console.log('Error while performing Query.');
      }
    })
}


exports.insertReviewDb = function(req,res,next){
  
  connection.query('SELECT artist_id FROM artist WHERE artist_name = ?',[req.body.artist_name],function(err,rows){
    req.body.artist_id = rows[0].artist_id;
    var lastArtist = req.body.artist_name;
    delete req.body.artist_name;
    console.log(req.body)
    connection.query('INSERT INTO ?? SET ?', ['reviews',req.body], function(err, result,rows){
      if (!err){
        
        res.send(lastArtist);
      } else{
        console.log('Error while performing Query.');
      }
    })
  })
}




// CREATE TABLE reviews (
//   review_id INT NOT NULL AUTO_INCREMENT,
  
//   user_name  VARCHAR(100) NOT NULL,
//   venue VARCHAR(100) NOT NULL,
//   number_of_stars INT NOT NULL,
//   review_details VARCHAR(10000) NOT NULL,
//   artist_id VARCHAR(100) NOT NULL,
//   PRIMARY KEY ( review_id )
// );
