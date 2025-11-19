import React, { useState } from "react";
import { Category } from "../types";

const categories: Category[] = ["Điện tử", "Quần áo", "Đồ ăn", "Sách", "Khác"];

export default function ProductForm({
	initial,
	onSubmit,
}: {
	initial?: any;
	onSubmit: (data: any) => void;
}) {
	const [ten, setTen] = useState(initial?.ten || "");
	const [danhMuc, setDanhMuc] = useState(initial?.danhMuc || "");
	const [gia, setGia] = useState<number | "">(initial?.gia ?? "");
	const [soLuong, setSoLuong] = useState<number | "">(initial?.soLuong ?? "");
	const [moTa, setMoTa] = useState(initial?.moTa || "");
	const [errors, setErrors] = useState<Record<string, string>>({});

	function validate() {
		const e: Record<string, string> = {};
		if (!ten || ten.trim().length < 3)
			e.ten = "Tên bắt buộc, tối thiểu 3 ký tự";
		if (danhMuc === "") e.danhMuc = "Chọn danh mục";
		if (gia === "" || Number(gia) <= 0) e.gia = "Giá phải là số dương";
		if (
			soLuong === "" ||
			!Number.isInteger(Number(soLuong)) ||
			Number(soLuong) < 0
		)
			e.soLuong = "Số lượng là số nguyên dương";
		setErrors(e);
		return Object.keys(e).length === 0;
	}

	function handle(e: React.FormEvent) {
		e.preventDefault();
		if (!validate()) return;
		onSubmit({
			ten: ten.trim(),
			danhMuc,
			gia: Number(gia),
			soLuong: Number(soLuong),
			moTa,
		});
	}

	return (
		<form className="form" onSubmit={handle}>
			<label>
				{" "}
				Tên sản phẩm
				<input value={ten} onChange={(e) => setTen(e.target.value)} />
				{errors.ten && <div className="error">{errors.ten}</div>}
			</label>

			<label>
				{" "}
				Danh mục
				<select
					value={danhMuc}
					onChange={(e) => setDanhMuc(e.target.value)}>
					<option value="">--Chọn--</option>
					{categories.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
				{errors.danhMuc && (
					<div className="error">{errors.danhMuc}</div>
				)}
			</label>

			<label>
				{" "}
				Giá (VND)
				<input
					type="number"
					value={gia as any}
					onChange={(e) =>
						setGia(e.target.value ? Number(e.target.value) : "")
					}
				/>
				{errors.gia && <div className="error">{errors.gia}</div>}
			</label>

			<label>
				{" "}
				Số lượng
				<input
					type="number"
					value={soLuong as any}
					onChange={(e) =>
						setSoLuong(e.target.value ? Number(e.target.value) : "")
					}
				/>
				{errors.soLuong && (
					<div className="error">{errors.soLuong}</div>
				)}
			</label>

			<label>
				{" "}
				Mô tả
				<textarea
					value={moTa}
					onChange={(e) => setMoTa(e.target.value)}
				/>
			</label>

			<div className="form-actions">
				<button className="btn" type="submit">
					Lưu
				</button>
			</div>
		</form>
	);
}
