const connectDB = require("./src/db");
const app = require("./src/index");

connectDB();

app.listen(3000, () => {
  console.log("Hello world");
});
