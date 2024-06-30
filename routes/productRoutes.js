import express from "express";
import {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
