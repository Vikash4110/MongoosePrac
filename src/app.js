const mongoose = require('mongoose');
const validator = require('validator');
// connecting and creating new database 
mongoose.connect("mongodb://localhost:27017/vikashdatabase") 
.then(() =>  console.log("Connection succesfull..."))
.catch((err) => console.log(err))

// Schema 
// A mongoose schema defines the structure of the document, default values, validators e.t.c
const playlistSchema =new  mongoose.Schema({
    name : {
        type : String ,
        required : true,
        lowercase : true,
        trim : true 
    },
    ctype : {
        type : String, 
        required : true,
        lowercase :true,
    },
    videos : {
        type : Number,
        validate(value) {
            if(value<0) {
                throw new Error("Video count should be negative");
            }
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value) {
            if (!validator.isEmail(value))
            throw new Error("Email is Invalid")
        }
    },
    active : Boolean,
    date : {
        type : Date,
        default : Date.now
    }
})


// A mongoose model is the wrapper on the mongoose Schema.
// A mongoose schema defines the structuer of the document, default value, validators, e.t.c, whereas a mongoose model provides an interface to the database for creating, quering, updating, deleting records e.t.c.

// Collection creation
const Playlist = new mongoose.model("Playlist", playlistSchema);

// create document or insert document
const createDocument = async () => {
   try {
    const reactPlaylist = new Playlist({
        name : "React.js",
        ctype : "Front-End",
        videos : 80 ,
        email : "Vikash",
        active : true
    })

    const mongoPlaylist = new Playlist({
        name : "mongo",
        ctype : "Back-End",
        videos : 80 ,
        email : "bharal224@gmail.com",
        active : true
    })

    const expressPlaylist = new Playlist({
        name : "express.js",
        ctype : "Back-End",
        videos : 80 ,
        email : "bharal224@gmail.com",
        active : true
    })


    const tailwindPlaylist = new Playlist({
        name : "tailWind",
        ctype : "Front-End",
        videos : 80 ,
        email : "bharal224.com", 
        active : true
    })
const result = await Playlist.insertMany([tailwindPlaylist, expressPlaylist, mongoPlaylist]);
console.log(result);
   } catch(err) {
    console.log(err);
   }
} 
createDocument();

const getDocument = async () => {
    try {
        const result = await Playlist
        .find({ $and: [{ ctype: "Back-End" }, { author: "Vikash" }] })
        .sort({name : -1})
        // .countDocuments(); // Use countDocuments() instead of count()
    console.log(result);
    }  catch(err) {
        console.log(err);
    }
}

getDocument();


// Update the documents
const updateDocuments = async (_id) => {
    try {
        const result = await Playlist.findByIdAndUpdate({_id}, {
            $set : {
                name : "EcmaScript"
            }
        })
        console.log(result);
    }
    catch (err) {
        console.log(err)
    }
}

updateDocuments('669ea4c7879eb1b71210a566');

//Delete the documents 

// const deleteDocument = async (_id) => {
//     try {
//         const result = await Playlist.deleteOne({_id});
//         console.log(result);
//     } catch(err) {

//     }
// }
// deleteDocument('669ea4c7879eb1b71210a566');
  