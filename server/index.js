import express from 'express';
import cors from 'cors';
import mongoose, {model,Schema} from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

const connectDB = async () =>{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Database Connected")
}
connectDB();

const PORT = 5000;

const noteSchema = new Schema({
    title : String,
    content : String ,
    category : String 
})

const Note = model("Note", noteSchema);

app.get('/health',(req,res)=>{
    res.json({
        success : true,
        message : 'Server is Healthy',
        data : null
    })
})


app.post('/notes',async(req,res)=>{
    const {title,content,category} = req.body

    const newNote = await Note.create({
        "title": title,
        "content": content ,
        "category" : category
    })

    res.json({
        success: true,
        message : "Notes added successfully",
        data : newNote

    })
})

app.get('/notes',async(req,res)=>{

    const notes = await Note.find();

    res.json({
        success : true,
        message : 'Notes fetched successfully',
        data: notes
    })
})

app.get('/notes/:id',async(req,res)=>{
    const {id} = req.params;

    const note = await Note.findOne({
        _id : id
    })

    res.json({
        success :true,
        message : "Notes fetched successfully",
        data : note

    })
})

app.put('/notes/:id',async(req,res)=>{
    const {id} = req.params;

    const {title,content,category} = req.body;

    await Note.updateOne({_id: id},{$set: {
        title : title,
        content : content,
        category : category
    }})
    res.json({
        success:true,
        message : 'Notes updated successfully',
        data : null
    })
})

app.delete('/notes/:id',async(req,res)=>{
    const {id} = req.params;

    await Note.deleteOne({_id: id})

    res.json({
        success : true,
        message:"Note deleted successfully",
        data : null
    })
})


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT} port` )
});


