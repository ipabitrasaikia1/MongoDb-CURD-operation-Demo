//----connecting modules ---//
const express = require("express")
const mongoose = require("mongoose")

const movies = require("./movie_db.json")

const app = express();
app.use(express.json())

//---- connecting Mongodb ---//

const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/entertainment")
}


//--- SCHEMA ---//
const movieSchema = new mongoose.Schema({
    "id" : {type:Number , required:true},
    "movie_name" : {type:String,required:true},
    "genre" : {type:String,required:true},
    "production_year" : {type:Number,required:true},
    "budget" : {type:Number,required:true}
    },{versionKey:false,timestamps:true})

    
//---MODEL---//
const Movie =  mongoose.model("movie",movieSchema)

//---- REST Api ---//

app.get("/",async (req,res)=>{
try {
     const newMovies = await Movie.find()
    return res.status(201).send(newMovies)  
} catch (e) {
    return res.status(500).send({message : e.message, status : "failed" } )
}
   
})


app.get("/:id",async (req,res)=>{
    try {
        const newMovie = await Movie.findById(req.params.id).lean().exec()
        return res.status(201).send(newMovie)  
    } catch (e) {
        return res.status(500).send({message : e.message, status : "failed" } )
    }
       
    })

app.post("/",async (req,res)=>{
    try {
        const pmovie = await Movie.create(req.body)
        return res.send(pmovie)
    } catch (e) {
        return res.send({messg : e.message})
    }
})


app.patch("/:id",async (req,res)=>{
    try {
        const newMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        return res.status(201).send(newMovie)  
    } catch (e) {
        return res.status(500).send({message : e.message, status : "failed" } )
    }
       
    })

    app.delete("/:id",async (req,res)=>{
        try {
            const newMovie = await Movie.findByIdAndDelete()
            return res.status(201).send("Movie Deleted")  
        } catch (e) {
            return res.status(500).send({message : e.message, status : "failed" } )
        }
           
        })
    

app.listen(5001,async ()=>{
   await connect()
    console.log("Poort open at 5001")
})