import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import coffeeRoute from './routes/coffees.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'

dotenv.config()
const app=express()

const port=process.env.PORT || 8000;
const corsOptions ={
    origin:true,
    Credentials:true,

}
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  
//database connection
mongoose.set("strictQuery",false);
const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,
            {
                useNewUrlParser:true,
                useUnifiedTopology:true
            })

            console.log('MongoDb database connected')
    } catch(err){
      console.log('MongoDB database connection failed')
    }
}


//for testing
app.get("/",(req,res)=>{
    res.send("api is working good")
})

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/coffees", coffeeRoute)
app.use("/api/v1/users", userRoute)


app.listen(port,()=>{
    connect();
    console.log('server is listening on port',port)
})