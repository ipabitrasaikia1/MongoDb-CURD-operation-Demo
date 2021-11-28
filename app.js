const express = require("express")
const mongoose = require("mongoose")

const app = express();
app.use(express.json())

// ---------- connecting mongoose ---//
const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/library")
} 

//---- creating SCHEMA and Model ----//

const userSchema = new mongoose.Schema({
    "first_name" : {type : String , require : true},
    "last_name"  : {type : String},
    
},{versionKey:false,timestamps:true});

const User = mongoose.model("user",userSchema) ;

const sectionSchema = new mongoose.Schema({
    body : {type : String , required : true},
    
},{versionKey:false,timestamps:true}) 

const Section = mongoose.model("section",sectionSchema) ;

const authorSchema = new mongoose.Schema({
    "first_name" : {type : String , required : true},
    "last_name" : {type : String},
},{versionKey:false,timestamps:true}) 

const Author = mongoose.model("author",authorSchema);

const bookSchema = new mongoose.Schema({
    "name" : {type : String , required : true},
    
    section_id : {type : mongoose.Schema.Types.ObjectId, ref : "section",require : true} ,
    author_id : {type : mongoose.Schema.Types.ObjectId, ref : "author",require : true} 
},{versionKey:false,timestamps:true}) 

const Book = mongoose.model("book",bookSchema) ;


const checkoutSchema = new mongoose.Schema({
  
    user_id : {type : mongoose.Schema.Types.ObjectId, ref : "User",require : true} ,
    section_id : {type : mongoose.Schema.Types.ObjectId, ref : "Section",require : true} ,
    book_id : {type : mongoose.Schema.Types.ObjectId, ref : "Book",require : true} ,
    author_id : {type : mongoose.Schema.Types.ObjectId, ref : "Author",require : true} 
},{versionKey:false,timestamps:true}) 

const Chekout = mongoose.model("checkout",checkoutSchema) ;


//---- Creating REST api for USER ---//

app.get("/users",async (req,res)=>{ 
    try {
        const users = await User.find() ;
        return res.status(201).send(users)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
app.get("/users/:id",async (req,res)=>{ 
    try {
        const user = await User.findById().lean().exec() ;
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
app.post("/users",async (req,res)=>{ 
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

app.patch("/users/:id",async (req,res)=>{ 
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new : true}) ;
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

app.delete("/users/:id",async (req,res)=>{ 
    try {
        const user = await User.findByIdAndDelete(req.params.id) ;
        return res.status(201).send("Deleted")
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

//---- Creating REST api for SECTION ---//

app.get("/section",async (req,res)=>{ 
    try {
        const sections = await Section.find() ;
        return res.status(201).send(sections)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
app.get("/section/:id",async (req,res)=>{ 
    try {
        const section = await Section.findById(req.params.id).lean().exec() ;
        return res.status(201).send(section)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
app.post("/section",async (req,res)=>{ 
    try {
        const section = await Section.create(req.body);
        return res.status(201).send(section)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

app.patch("/section/:id",async (req,res)=>{ 
    try {
        const section = await Section.findByIdAndUpdate(req.params.id,req.body,{new : true}) ;
        return res.status(201).send(section)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

app.delete("/section/:id",async (req,res)=>{ 
    try {
        const section = await Section.findByIdAndDelete(req.params.id) ;
        return res.status(201).send("Deleted")
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 



//---- Creating REST api for Books ---//

app.get("/books",async (req,res)=>{ 
    try {
        const users = await Book.find().populate("section_id").populate("author_id") ;
        return res.status(201).send(users)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
app.get("/books/:id",async (req,res)=>{ 
    try {
        const user = await Book.findById(req.params.id).populate("section_id").populate("author_id").lean().exec() ;
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
app.post("/books",async (req,res)=>{ 
    try {
        const user = await Book.create(req.body);
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

app.patch("/books/:id",async (req,res)=>{ 
    try {
        const user = await Book.findByIdAndUpdate(req.params.id,req.body,{new : true}) ;
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

app.delete("/books/:id",async (req,res)=>{ 
    try {
        const user = await Book.findByIdAndDelete(req.params.id) ;
        return res.status(201).send("Deleted")
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 


//---- Creating REST api for Authors ---//

app.get("/authors",async (req,res)=>{ 
    try {
        const users = await Author.find() ;
        return res.status(201).send(users)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
app.get("/authors/:id",async (req,res)=>{ 
    try {
        const user = await Author.findById().lean().exec() ;
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
app.post("/authors",async (req,res)=>{ 
    try {
        const user = await Author.create(req.body);
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

app.patch("/authors/:id",async (req,res)=>{ 
    try {
        const user = await Author.findByIdAndUpdate(req.params.id,req.body,{new : true}) ;
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

app.delete("/authors/:id",async (req,res)=>{ 
    try {
        const user = await Author.findByIdAndDelete(req.params.id) ;
        return res.status(201).send("Deleted")
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 







app.listen(5002,async()=>{
    await connect();
    console.log("Port ready at 5002")

})