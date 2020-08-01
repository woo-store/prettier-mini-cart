import { useState } from "@wordpress/element";
import { useEffect } from "react";
import { useDebounceFn } from "ahooks";
import { deleteProduct, updateQuantity } from "../helpers";
import { formatPrice } from "../../common";
import { Close } from "../../icons";

const Products = ({ products, setCart }) => {
	return products.map((product) => <Product product={product} setCart={setCart} />);
};

const Product = ({ product, setCart }) => {
	const [quantity, setQuantity] = useState(product.quantity);
	useEffect(() => {
		setQuantity(product.quantity);
	}, [product.quantity]);

	const { run } = useDebounceFn(
		(value) => {
			updateQuantity(product.key, value, setCart);
		},
		{ wait: 1000 },
	);
	return (
		<div className="grid grid-cols-10 gap-1 py-2">
			<div className="col-span-3">
				<img width={100} src={product.images[0].thumbnail} alt="" />
			</div>
			<div className="px-3 col-span-6">
				<div className="text-2xl">{product.name}</div>
				{plugin.settings.priceTag && (
					<div className="text-xl py-2">
						{quantity} x {formatPrice(product.prices.sale_price, product.prices.currency_minor_unit, product.prices.currency_symbol)}
					</div>
				)}
				{plugin.settings.productQuantity && (
					<div className="flex mt-2">
						<div className="cursor-pointer border-solid border-neutral-400 border flex items-center p-2">
							<span
								onClick={() => {
									setQuantity(quantity - 1);
									updateQuantity(product.key, quantity - 1, setCart);
								}}
							>
								-
							</span>
						</div>
						<div className="input-pretitire vnh-input">
							<input
								// defaultValue={quantity}
								onChange={(e) => {
									setQuantity(e.target.value);
									run(e.target.value);
								}}
								name={product.key}
								type="text"
								value={quantity}
							/>
						</div>
						<div className="cursor-pointer border-solid border-neutral-400 border flex items-center p-2">
							<span
								onClick={() => {
									setQuantity(quantity + 1);
									updateQuantity(product.key, quantity + 1, setCart);
								}}
							>
								+
							</span>
						</div>
					</div>
				)}
			</div>
			{plugin.settings.removeProduct && (
				<div className="text-center col-span-1">
					<span className="cursor-pointer" onClick={() => deleteProduct(product.key, setCart)}>
						<Close />
					</span>
				</div>
			)}
		</div>
	);
};
export default Products;
