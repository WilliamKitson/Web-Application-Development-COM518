import express from "express";
import ViteExpress from "vite-express";
import authenticationRouter from "./routers/authenticationRouter.mjs";
import landmarkRouter from "./routers/landmarkRouter.mjs";

const app = express();

app.use(express.static("public"));
app.use("/authentication", authenticationRouter);
app.use("/landmark", landmarkRouter)

app.get("/", (req,res)=> {
    res.redirect("/index.html")
});

ViteExpress.listen(app, 3000);