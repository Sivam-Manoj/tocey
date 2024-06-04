require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ConnectMongoDb } = require("./Config/db");
const path = require("path");
const errorHandler = require("./Middlewares/errorHandler");
const app = express();
const port = process.env.PORT || 3001;

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true,
};
app.use(cors(corsOptions));

//connect database
ConnectMongoDb();

//routes
app.use("/user", require("./Routes/UserRoutes"));
app.use("/task", require("./Routes/TaskRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"))
  })
}
//error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
