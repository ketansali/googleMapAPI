require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./middleware/404");
const errorHandler = require("./middleware/error-hendler");
const corsOptionsDelegate = require("./middleware/cors");
const PORT = process.env.PORT;

//routes
const googleMapRoute = require('./routes/googleMapRoute')

// format
app.use(
  express.json({
    limit: "1024mb",
  })
);
app.use(
  express.urlencoded({
    limit: "1024mb",
    extended: true,
  })
);
// cors
app.use(cors(corsOptionsDelegate));

app.use('/api',googleMapRoute)



// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
