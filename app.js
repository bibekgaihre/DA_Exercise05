let express = require("express");
let bodyParser = require("body-parser");
let routes = require("./routes");

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
