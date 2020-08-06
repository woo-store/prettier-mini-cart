import { formatPrice } from "../../common";
import { Close } from "../../icons";

const Products = ({ products, setCart, settings }) => {
	return products.map((product) => <Product product={product} setCart={setCart} settings={settings} />);
};

const Product = ({ product, settings }) => {
	return (
		<div className="grid grid-cols-10 gap-1 py-2">
			<div className="col-span-3">
				<img width={100} src={product.images[0].thumbnail} alt="" />
			</div>
			<div className="px-3 col-span-6">
				<div>{product.name}</div>
				{settings.priceTag && (
					<div className="py-2">
						{product.quantity} x{" "}
						{formatPrice(product.prices.sale_price, product.prices.currency_minor_unit, product.prices.currency_symbol)}
					</div>
				)}
				{settings.productQuantity && (
					<div className="flex mt-2">
						<div className="cursor-pointer border-solid border-neutral-400 border flex items-center p-2 h-4">
							<span>-</span>
						</div>
						<div className="input-pretitire vnh-input">
							<input name={product.key} type="text" value={product.quantity} />
						</div>
						<div className="cursor-pointer border-solid border-neutral-400 border flex items-center p-2 h-4">
							<span>+</span>
						</div>
					</div>
				)}
			</div>
			{settings.removeProduct && (
				<div className="text-center col-span-1">
					<span className="cursor-pointer">
						<Close />
					</span>
				</div>
			)}
		</div>
	);
};
export default Products;
