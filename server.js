
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var engine = require('ejs-locals');

var FROGS_FILE = path.join(__dirname, 'frogs.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/views');
app.engine('ejs', engine);

app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Application Routes ==============================
 // Home Route
  app.get('/', function(req, res){
      res.render('index');
  });
  // Add Frog
  app.get('/add-frog/:id?', function(req, res){
      res.render('add_frog');
  });



// Data Routes ===========================================
app.get('/api/frogs', function(req, res) {
  fs.readFile(FROGS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/add-frog', function(req, res) {
  fs.readFile(FROGS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var frogs = JSON.parse(data);

        var newFrog = {
            id: Date.now(),
            "frog_name"         : req.body.frog_name,
            "frog_color"        : req.body.frog_color,
            "gender"            : req.body.gender,
            "mating"            : req.body.mating,
            "noise"             : req.body.noise,
            "noise_time"        : req.body.noise_time,
            "complaints"        : req.body.complaints,
            "dob"               : req.body.dob,
            "dod"               : req.body.dod,
            "pond_env"          : req.body.pond_env,
            "image"             : getFrogPicture(),
        }

    frogs.push(newFrog);
    fs.writeFile(FROGS_FILE, JSON.stringify(frogs, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(frogs);
    });
  });
});

// Delete Frog
app.post('/api/delete-frog', function(req, res) {
  fs.readFile(FROGS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var frogs = JSON.parse(data);
    console.log(frogs);
    //delete frogs[req.body.frog_id];

    var index = findItem(frogs, "id", parseInt(req.body.frog_id) );
    console.log(index);
    if (index !== -1) {
      frogs.splice(index, 1);
    }

   // frogs.push(newFrog);
    fs.writeFile(FROGS_FILE, JSON.stringify(frogs, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(frogs);
    });
  });
});
//Get Edit Frog ====================
app.post('/api/get-frog', function(req, res) {
  fs.readFile(FROGS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var frogs = JSON.parse(data);
    //delete frogs[req.body.frog_id];
    var index = findItem(frogs, "id", parseInt(req.body.frog_id) );
    if (index !== -1) {
       res.json(frogs[index]);
    }
  });
});
// Update Frog
app.post('/api/update-frog', function(req, res) {
  fs.readFile(FROGS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var frogs = JSON.parse(data);
    var index = findItem(frogs, "id", parseInt(req.body.frog_id) );
    if (index !== -1) {
        var updated_data = req.body.updated_frog;
        updated_data.id  = parseInt(updated_data.id);
        updated_data.image  = getFrogPicture();
        frogs[index]     = updated_data;
        console.log(frogs[index]);
        }

   // frogs.push(newFrog);
    fs.writeFile(FROGS_FILE, JSON.stringify(frogs, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(frogs);
    });
  });
});





app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// Helper Functions
  function findItem(arr, key, value) {
      for (var i = 0; i < arr.length; i++) {
         if (arr[i][key] === value) {
             return(i);
         }
      }
      return(-1);
  }
// Get Random Frog Picture
function getFrogPicture(){
var pics = [
              "http://s.hswstatic.com/gif/frog-1.jpg",

              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQERWqA2Ai2coDY7nyNkBmZjFZ3cpvb4J8pNLQa4LwfmJw3COM_",

              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQD23dl3RwUUn1WtX7Ypcf11edYcWfga_M7TSnPNRTgU2oly5sW",

              "https://s-media-cache-ak0.pinimg.com/736x/bf/4e/40/bf4e4067252227bd3f758bba7dcee2ff.jpg",

              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRnLex0hh-avaBeyaSC1B8uJa0IThPoHu2SkcXvOeT0UlTOnP3Y",

              "https://s-media-cache-ak0.pinimg.com/736x/c0/07/24/c00724acf19c8850b3260c426781f506.jpg",

              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTQdhJsygF02gWbNfUuYeIGLHum9_3C_JZCtEey0e-gSKjxzkVX",

              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRjp_Mbp_07DDzzmPM6YrV644nMvm-sxASHII2B57arhv5EaI_3",

              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQgylPSuu9VlLEsAcB5itmo5hLQG0danWI91u2U3z3cowCkh3Ej",

              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtOhsVeYiTEGRr5wsgkvOHEKrDGtylGedg2OxV9DsNtrYE8fKO",

              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlL-ZcSiD05I7h4GbmKWh1TZUctPK9c4SMfPfo3sr-o6VrGdSZ",
              ];

var random = Math.floor((Math.random() * 10) + 1);
 return pics[random];


}