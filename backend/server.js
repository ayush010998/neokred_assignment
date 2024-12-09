const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { marked } = require("marked");

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());


app.post("/convert", (req, res) => {
  const { markdown } = req.body;

  if (!markdown) {
    return res.status(400).json({ error: "Please Enter Markdown Input" });
  }

  try {
    const html = marked(markdown);
    res.json({ html });
  } catch (error) {
    res.status(500).json({ error: "Markdown Processing Failed" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
