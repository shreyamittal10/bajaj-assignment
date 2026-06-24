const express = require("express");
const cors = require("cors");

const { processHierarchy } = require("./controllers/bfhlController");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/bfhl", processHierarchy);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
