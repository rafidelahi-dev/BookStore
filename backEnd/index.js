import  express  from "express";
import { PORT, mongoDBURL } from "./config.js"; //Must write config.js, if you don't use config (.js) then it can not detect the file
import { Book } from "./models/bookModel.js";
import router from "./routes/booksRoute.js";
import mongoose from "mongoose";
import cors from "cors"


const app = express();
app.use(express.json())


//Two ways to use cors. Option 1: this way allows everything
//app.use(cors())
//Option 2: Allow Custom Origins
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-type'],
}))
//Checks whether it works or not
app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN Stack Bookstore')
})

app.use('/books', router )


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



