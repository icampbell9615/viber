import React from "react";
import {BrowserRouter} from 'react-router-dom'
import MainRouter from './MainRouter'

const mongoose = require ('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()
 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});


const App = () => (
<BrowserRouter>
 <MainRouter />
</BrowserRouter>
)

export default App;
