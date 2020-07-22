import http from "./http";
import {isEmpty} from 'lodash';

const numberOfDecimal = (number) => {
  let result = 1;
  if (number === 0) {
	 return result;
  }
  result += "0".repeat(number)
  return parseInt(result);
};

const formatPrice = (price, minorUnit, symbol) => {
  return (price / numberOfDecimal(minorUnit)).toFixed(minorUnit) + symbol;
}


export default class App extends Component {
  state = {
	 products: [],
  }

  async componentDidMount() {
	 const res = await http.get('wc/store');
	 try {
		const {data} = await http.get('wc/store/cart');
		console.log(data);
		this.setState({products: data.items, totals: data.totals});
	 } catch (e) {
		console.log(e.message);
	 }
  }

  updateQuantity = async (key, quantity) => {
	 try {
		const {data: {items: products}} = await http.post('wc/store/cart/update-item', {key, quantity});
		this.setState({products});
	 } catch (e) {
		console.log(e.message);
	 }
  }

  deleteProduct = async (key) => {
	 try {
		const {data: {items: products}} = await http.post('/wc/store/cart/remove-item', {key});
		this.setState({products});
	 } catch (e) {
		console.log(e.message);
	 }
  }

  render() {
	 const {products, totals} = this.state;
	 if (isEmpty(products)) {
		return null;
	 }
	 console.log(products);
	 const productsRender = products.map(product => {
		return (
		  <div className="flex-row pb-6 flex">
			 <div className="">
				<img width={100} src={product.images[0].thumbnail} alt=""/>
			 </div>
			 <div className="px-3">
				<div>{product.name}</div>
				<div className="text-xl py-2">{product.quantity} x {
				  formatPrice(
					 product.prices.sale_price,
					 product.prices.currency_minor_unit,
					 product.prices.currency_symbol
				  )}</div>
				<div className="flex">
				  <div className="cursor-pointer border-solid border-gray border flex items-center p-2"
						 onClick={() => this.updateQuantity(product.key, product.quantity - 1)}>-
				  </div>
				  <div className="input-pretitire">
					 <input defaultValue={product.quantity} type="text" className="input-quantity"/>
				  </div>
				  <div className="cursor-pointer border-solid border-gray border flex items-center p-2"
						 onClick={() => this.updateQuantity(product.key, product.quantity + 1)}
				  >+
				  </div>
				</div>
			 </div>
			 <div className="cursor-pointer" onClick={() => this.deleteProduct(product.key)}>x</div>
		  </div>
		);
	 });
	 return (
		<div className="font-serif fixed position-cart-left-top  z-10">
		  <div className="absolute left-0 top-0 w-24 h-24">
			 Cart btn
		  </div>
		  <div className="relative left-24 rounded overflow-hidden shadow-lg bg-white bg-cart">
			 <div className="px-6 py-4 border-gray-700 border-b border-solid">
				<div className="font-bold mb-2 text-center">Cart content</div>
			 </div>
			 <div className="px-6 py-4">
				<div className="h-m-450 overflow-y-auto">
				  {productsRender}
				  <hr className="m-0"/>
				  <div className="p-2">
					 <div className="flex justify-between">
						<div>Subtotal</div>
						<div>{formatPrice(totals.total_items, totals.currency_minor_unit, totals.currency_symbol)}</div>
					 </div>
					 <div className="flex justify-between py-2">
						<div>Shipping</div>
						<div>{formatPrice(totals.total_shipping, totals.currency_minor_unit, totals.currency_symbol)}</div>
					 </div>
					 <div className="flex justify-between">
						<div>Taxes</div>
						<div>{formatPrice(totals.total_shipping_tax, totals.currency_minor_unit, totals.currency_symbol)}</div>
					 </div>
				  </div>
				  <hr className="m-0"/>
				  <div className="p-2 flex justify-between">
					 <div>Total</div>
					 <div>{formatPrice(totals.total_price, totals.currency_minor_unit, totals.currency_symbol)}</div>
				  </div>
				</div>
			 </div>
		  </div>
		</div>
	 )
  }
}
