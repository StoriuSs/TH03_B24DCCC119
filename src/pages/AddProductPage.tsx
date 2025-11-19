import React from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../shared/ProductForm";
import { useProducts } from "../context/ProductContext";

export default function AddProductPage() {
	const { add } = useProducts();
	const nav = useNavigate();

	function handleSubmit(data: any) {
		add(data);
		nav("/");
	}

	return (
		<div className="container">
			<button onClick={() => nav("/")} className="btn-back">
				← Quay lại
			</button>
			<h2>Thêm sản phẩm</h2>
			<ProductForm onSubmit={handleSubmit} />
		</div>
	);
}
