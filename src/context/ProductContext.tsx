import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "../types";
import { initialProducts } from "../data/initialProducts";

type State = { products: Product[] };

type Action =
	| { type: "add"; payload: Product }
	| { type: "update"; payload: Product }
	| { type: "delete"; payload: number };

const initialState: State = { products: initialProducts };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "add":
			return { products: [action.payload, ...state.products] };
		case "update":
			return {
				products: state.products.map((p) =>
					p.id === action.payload.id ? action.payload : p
				),
			};
		case "delete":
			return {
				products: state.products.filter((p) => p.id !== action.payload),
			};
		default:
			return state;
	}
}

const ProductContext = createContext<{
	state: State;
	add: (p: Omit<Product, "id">) => void;
	update: (p: Product) => void;
	remove: (id: number) => void;
} | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	function add(p: Omit<Product, "id">) {
		const id = Date.now();
		dispatch({ type: "add", payload: { id, ...p } });
	}

	function update(p: Product) {
		dispatch({ type: "update", payload: p });
	}

	function remove(id: number) {
		dispatch({ type: "delete", payload: id });
	}

	return (
		<ProductContext.Provider value={{ state, add, update, remove }}>
			{children}
		</ProductContext.Provider>
	);
}

export function useProducts() {
	const ctx = useContext(ProductContext);
	if (!ctx)
		throw new Error("useProducts must be used within ProductProvider");
	return ctx;
}
