import express from "express";

import cors from "cors";

function setUpServer() {
  const app = express();
  const port = 2607;

  app.use(cors());
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}

async function main() {
  setUpServer();
}

main();
