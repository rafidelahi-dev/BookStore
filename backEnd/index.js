import  express  from "express";
import { PORT, mongoDBURL } from "./config.js"; //Must write config.js, if you don't use config (.js) then it can not detect the file
import { Book } from "./models/bookModel.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json())

//Checks whether it works or not
app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN Stack Bookstore')
})

//Gives all the book
app.get('/books', async (req,res) => {
  try{
    const books = await Book.find({})

    return res.status(200).json({
      count: books.length,
      data: books
    })

  } catch(error){
    console.log(error.message);
    res.status(500).send({message: error.message})
  }
})


//Gives specific book by it's id
app.get('/books/:id', async (req,res) => {
  try{
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book)
  } catch(error){
    console.log(error);
    res.status(500).send({message: error.message})
  } 
})

//Inserts book in the database
app.post('/books', async (req, res) => {
  try{
    if(!req.body.title ||
      !req.body.author ||
      !req.body.publishYear
      ) {
        return res.status(400).send({message: `Send all required fields: title, author, publishYear`,})
      }
      const newBook = {
        title : req.body.title,
        author : req.body.author,
        publishYear : req.body.publishYear
      }
      const book = await Book.create(newBook)
      return res.status(201).send(book)
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message})
  }
})


//Connecting backend to the database
mongoose.connect(mongoDBURL).then(() => {
  console.log(`App connected to Database`);
  app.listen(PORT, () => {
       console.log(`App is listening to port: ${PORT}`)
     })
})
   .catch((error) => {
     console.log(error)
   })



