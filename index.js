const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const mongoDB = require("./db")
mongoDB();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname+ '/public')));



app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})


// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname+ '/public'));
//   // res.send('Hello World!');
// })


// app.use(express.static(path.join(__dirname + "/public")))
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})