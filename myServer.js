let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const port = process.env.PORT || 2450;
app.listen(port, () => console.log(`Listening on port ${port}!`));
let axios = require("axios");

app.post("/getData", async function (req, res) {
  let { method, fetchurl, data } = req.body;
  try {
    let response;
    if (method === "GET") {
      response = await axios.get(fetchurl);
    } else response = await axios.post(fetchurl, data);
    res.send(response.data);
  } catch (err) {
    if (err.response) {
      let { status, statusText } = err.response;
      res.status(401).send({ errCode: status, errMessage: statusText });
    } else res.status(401).send("Request Failed");
  }
});
