import { app } from "./app";

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log();
  console.log(`Server is listening on port ${port}`);
  console.log();
});
