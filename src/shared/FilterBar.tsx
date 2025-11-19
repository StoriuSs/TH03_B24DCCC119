import React from "react";
import { Category } from "../types";

const categories: (Category | "")[] = [
	"",
	"Điện tử",
	"Quần áo",
	"Đồ ăn",
	"Sách",
	"Khác",
];

export default function FilterBar({
	category,
	setCategory,
	minPrice,
	maxPrice,
	setMinPrice,
	setMaxPrice,
}: {
	category: string;
	setCategory: (c: string) => void;
	minPrice: number | "";
	maxPrice: number | "";
	setMinPrice: (n: number | "") => void;
	setMaxPrice: (n: number | "") => void;
}) {
	return (
		<div className="filters">
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}>
				{categories.map((c) => (
					<option key={c || "all"} value={c}>
						{c || "Tất cả danh mục"}
					</option>
				))}
			</select>
			<input
				type="number"
				placeholder="Min giá"
				value={minPrice as any}
				onChange={(e) =>
					setMinPrice(e.target.value ? Number(e.target.value) : "")
				}
			/>
			<input
				type="number"
				placeholder="Max giá"
				value={maxPrice as any}
				onChange={(e) =>
					setMaxPrice(e.target.value ? Number(e.target.value) : "")
				}
			/>
		</div>
	);
}
