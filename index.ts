import app from "./app";

//load .env
require("dotenv").config();

const PORT = process.env.PORT || 4211;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
