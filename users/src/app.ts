import "dotenv/config";
import express from "express";
import beneficiaryRoute from "./routes/beneficiary.route";
import hrAdvisorRoute from "./routes/hrAdvisor.route";
import employeRoute from "./routes/employe.route";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use("/api/beneficiary", beneficiaryRoute);
app.use("/api/hrAdvisor", hrAdvisorRoute);
app.use("/api/employe", employeRoute);

app.listen(PORT, () => {
  console.log("USERS SERVICES RUNNING ON PORT " + PORT);
});
