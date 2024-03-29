const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = express.Router();
const PORT = 4000;
let User = require('./user.model');


var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function (origin, callback) {
   /* if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORScc'))
    }
    */
   callback(null, true)
  }
}  
app.use(cors(corsOptions));

app.use('/users', userRoutes);
 


app.use(bodyParser.json());




mongoose.connect('mongodb://127.0.0.1:27017/erp', { useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
}); 

userRoutes.route('/').get(function(req, res) {
    User.find(function(err, Users) {
        if (err) {
            console.log(err); 
        } else {
            res.json(Users);
        }
    });
});

userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

userRoutes.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
        
            user.user_description = req.body.user_description;
            user.user_responsible = req.body.user_responsible;
            user.user_priority = req.body.user_priority;
            user.user_completed = req.body.user_completed;

            user.save().then(user => {
                res.json('user updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


