import React from "react";

export default function SearchBar({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<input
			className="search"
			placeholder="Tìm kiếm theo tên..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
}
