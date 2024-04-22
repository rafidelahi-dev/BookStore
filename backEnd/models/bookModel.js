import mongoose from "mongoose";

//Making the mongo schema
const bookShema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  publishYear: {
    type: Number,
    require: true,
  },
},
{
 timestamps : true,
})


//exporting with a built in model of mongoDB named Cat 
export const Book = mongoose.model('Cat',bookShema);