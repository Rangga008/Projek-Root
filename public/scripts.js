document.addEventListener("DOMContentLoaded", () => {
	const productForm = document.getElementById("product-form");
	const productList = document.getElementById("product-list");
	const productIdInput = document.getElementById("product-id");

	const apiUrl = "http://localhost:3000/api/products";

	const fetchProducts = async () => {
		try {
			const response = await fetch(apiUrl);
			const products = await response.json();
			renderProducts(products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const renderProducts = (products) => {
		productList.innerHTML = "";
		products.forEach((product) => {
			const productRow = document.createElement("tr");
			productRow.innerHTML = `
		  <td>${product.id}</td>
		  <td>${product.name}</td>
		  <td>${product.desc}</td>
		  <td>${product.store}</td>
		  <td>${product.quantity}</td>
		  <td>${product.price}</td>
		  <td class="actions">
			<button onclick="editProduct(${product.id})">Edit</button>
			<button onclick="deleteProduct(${product.id})">Delete</button>
		  </td>
		`;
			productList.appendChild(productRow);
		});
	};

	const addOrUpdateProduct = async (event) => {
		event.preventDefault();
		const id = productIdInput.value;
		const name = document.getElementById("name").value;
		const desc = document.getElementById("desc").value;
		const store = document.getElementById("store").value;
		const quantity = document.getElementById("quantity").value;
		const price = document.getElementById("price").value;

		const product = { name, desc, store, quantity, price };

		try {
			if (id) {
				await fetch(`${apiUrl}/${id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(product),
				});
			} else {
				await fetch(apiUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(product),
				});
			}
			fetchProducts();
			productForm.reset();
			productIdInput.value = "";
		} catch (error) {
			console.error("Error adding/updating product:", error);
		}
	};

	window.editProduct = async (id) => {
		try {
			const response = await fetch(`${apiUrl}/${id}`);
			const product = await response.json();
			document.getElementById("product-id").value = product.id;
			document.getElementById("name").value = product.name;
			document.getElementById("desc").value = product.desc;
			document.getElementById("store").value = product.store;
			document.getElementById("quantity").value = product.quantity;
			document.getElementById("price").value = product.price;
		} catch (error) {
			console.error("Error fetching product:", error);
		}
	};

	window.deleteProduct = async (id) => {
		try {
			await fetch(`${apiUrl}/${id}`, {
				method: "DELETE",
			});
			fetchProducts();
		} catch (error) {
			console.error("Error deleting product:", error);
		}
	};

	productForm.addEventListener("submit", addOrUpdateProduct);

	fetchProducts();
});
