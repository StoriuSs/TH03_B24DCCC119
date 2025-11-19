import React from "react";
import { Product } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function ProductCard({ product }: { product: Product }) {
	const nav = useNavigate();
	const { remove } = useProducts();

	function handleDelete() {
		if (confirm(`Bạn có chắc muốn xóa "${product.ten}"?`)) {
			remove(product.id);
		}
	}

	return (
		<div className="card">
			<div className="card-body">
				<h3>{product.ten}</h3>
				<p className="muted">{product.danhMuc}</p>
				<p className="price">{product.gia.toLocaleString()} VND</p>
				<p className="muted">Số lượng: {product.soLuong}</p>
			</div>
			<div className="card-footer">
				<Link to={`/products/${product.id}`} className="btn">
					Xem
				</Link>
				<button
					className="btn"
					onClick={() => nav(`/edit/${product.id}`)}>
					Sửa
				</button>
				<button className="btn btn-danger" onClick={handleDelete}>
					Xóa
				</button>
			</div>
		</div>
	);
}
