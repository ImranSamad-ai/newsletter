const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;
const connectDB = require("./src/db");
const app = require("./src/index");

connectDB();

app.listen(port, () => {
  console.log("Hello world");
});
