import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/mizu", (req, res) => {
    res.send("Hello, welcome to MizuRoru");
});

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();

    res.send(products);
});

app.listen(PORT, ()=> console.log(`server running at port ${PORT}`));
