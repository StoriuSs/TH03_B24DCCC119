import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function ProductDetailPage() {
	const { id } = useParams();
	const nav = useNavigate();
	const { state, remove } = useProducts();
	const pid = Number(id);
	const product = state.products.find((p) => p.id === pid);

	if (!product)
		return <div className="container">Sản phẩm không tìm thấy</div>;

	function onDelete() {
		if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
			remove(product!.id);
			nav("/");
		}
	}

	return (
		<div className="container detail">
			<button onClick={() => nav("/")} className="btn-back">
				← Quay lại
			</button>
			<h2>{product!.ten}</h2>
			<p>
				<strong>Danh mục:</strong> {product!.danhMuc}
			</p>
			<p>
				<strong>Giá:</strong> {product!.gia.toLocaleString()} VND
			</p>
			<p>
				<strong>Số lượng:</strong> {product!.soLuong}
			</p>
			<p>
				<strong>Mô tả:</strong> {product!.moTa}
			</p>
			<div className="actions">
				<button
					onClick={() => nav(`/edit/${product!.id}`)}
					className="btn">
					Chỉnh sửa
				</button>
				<button onClick={onDelete} className="btn btn-danger">
					Xóa
				</button>
			</div>
		</div>
	);
}
