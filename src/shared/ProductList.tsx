import React from "react";
import { Product } from "../types";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: { products: Product[] }) {
	if (products.length === 0)
		return <div className="container">Không có sản phẩm phù hợp.</div>;
	return (
		<div className="grid">
			{products.map((p) => (
				<ProductCard key={p.id} product={p} />
			))}
		</div>
	);
}
