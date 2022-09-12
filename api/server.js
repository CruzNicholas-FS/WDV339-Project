require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const spotify=require("./routes/spotify");
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use("/spotify/v1", spotify);

app.listen(process.env.PORT || 3001);