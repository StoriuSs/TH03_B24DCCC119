import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../shared/ProductForm";
import { useProducts } from "../context/ProductContext";

export default function EditProductPage() {
	const { id } = useParams();
	const { state, update } = useProducts();
	const nav = useNavigate();
	const pid = Number(id);
	const product = state.products.find((p) => p.id === pid);

	if (!product)
		return <div className="container">Sản phẩm không tìm thấy</div>;

	function handleSubmit(data: any) {
		update({ id: product!.id, ...data });
		nav(`/products/${product!.id}`);
	}

	return (
		<div className="container">
			<button onClick={() => nav("/")} className="btn-back">
				← Quay lại
			</button>
			<h2>Chỉnh sửa sản phẩm</h2>
			<ProductForm initial={product} onSubmit={handleSubmit} />
		</div>
	);
}
