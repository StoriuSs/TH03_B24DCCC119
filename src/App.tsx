import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

export default function App() {
	return (
		<div className="app">
			<header className="app-header">
				<h1>Shoqqe</h1>
				<nav>
					<Link to="/">Trang chủ</Link>
					<Link to="/add" className="btn-add">
						Thêm sản phẩm
					</Link>
				</nav>
			</header>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/products/:id"
						element={<ProductDetailPage />}
					/>
					<Route path="/add" element={<AddProductPage />} />
					<Route path="/edit/:id" element={<EditProductPage />} />
				</Routes>
			</main>
		</div>
	);
}
