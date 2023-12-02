import { app } from ".";
app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`);
  });