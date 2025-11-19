import React, { useMemo, useState } from "react";
import { useProducts } from "../context/ProductContext";
import ProductList from "../shared/ProductList";
import SearchBar from "../shared/SearchBar";
import FilterBar from "../shared/FilterBar";
import Pagination from "../shared/Pagination";

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
	const { state } = useProducts();
	const [q, setQ] = useState("");
	const [category, setCategory] = useState<string>("");
	const [minPrice, setMinPrice] = useState<number | "">("");
	const [maxPrice, setMaxPrice] = useState<number | "">("");
	const [page, setPage] = useState(1);

	const filtered = useMemo(() => {
		let list = state.products;
		if (q.trim())
			list = list.filter((p) =>
				p.ten.toLowerCase().includes(q.toLowerCase())
			);
		if (category) list = list.filter((p) => p.danhMuc === category);
		if (minPrice !== "")
			list = list.filter((p) => p.gia >= Number(minPrice));
		if (maxPrice !== "")
			list = list.filter((p) => p.gia <= Number(maxPrice));
		return list;
	}, [state.products, q, category, minPrice, maxPrice]);

	const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
	const current = filtered.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	);

	return (
		<div className="container">
			<div className="controls">
				<SearchBar
					value={q}
					onChange={(v) => {
						setQ(v);
						setPage(1);
					}}
				/>
				<FilterBar
					category={category}
					setCategory={(c: string) => {
						setCategory(c);
						setPage(1);
					}}
					minPrice={minPrice}
					maxPrice={maxPrice}
					setMinPrice={setMinPrice}
					setMaxPrice={setMaxPrice}
				/>
			</div>

			<div className="summary">
				Tổng: <strong>{filtered.length}</strong> sản phẩm — Trang {page}
				/{totalPages}
			</div>

			<ProductList products={current} />

			<Pagination
				page={page}
				totalPages={totalPages}
				onChange={(p) => setPage(p)}
			/>
		</div>
	);
}
