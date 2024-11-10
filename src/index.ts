import app from "./app";
import { sequelize } from "./database";

const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();