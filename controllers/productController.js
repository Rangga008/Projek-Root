import prisma from "../prismaClient.js";

export const getAllProducts = async (req, res) => {
	try {
		const products = await prisma.product.findMany();
		res.json(products);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const createProduct = async (req, res) => {
	const { name, desc, store, quantity, price } = req.body;
	try {
		const newProduct = await prisma.product.create({
			data: { name, desc, store, quantity, price },
		});
		res.status(201).json(newProduct);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { name, desc, store, quantity, price } = req.body;
	try {
		const updatedProduct = await prisma.product.update({
			where: { id: Number(id) },
			data: { name, desc, store, quantity, price },
		});
		res.json(updatedProduct);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.product.delete({
			where: { id: Number(id) },
		});
		res.status(204).end();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
