import React from "react";

export default function Pagination({
	page,
	totalPages,
	onChange,
}: {
	page: number;
	totalPages: number;
	onChange: (p: number) => void;
}) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	return (
		<div className="pagination">
			<button
				className="btn"
				onClick={() => onChange(Math.max(1, page - 1))}
				disabled={page === 1}>
				Trước
			</button>
			{pages.map((p) => (
				<button
					key={p}
					className={`btn ${p === page ? "active" : ""}`}
					onClick={() => onChange(p)}>
					{p}
				</button>
			))}
			<button
				className="btn"
				onClick={() => onChange(Math.min(totalPages, page + 1))}
				disabled={page === totalPages}>
				Sau
			</button>
		</div>
	);
}
