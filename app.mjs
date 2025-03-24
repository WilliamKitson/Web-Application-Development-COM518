import express from "express";
import ViteExpress from "vite-express";
import landmarkRouter from "./landmarkRouter.mjs";

const app = express();

app.use(express.static("public"));
app.use("/pointsofinterest", landmarkRouter)

app.get("/", (req,res)=> {
    res.redirect("/index.html")
});

ViteExpress.listen(app, 3000);