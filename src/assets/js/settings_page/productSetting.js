import { PanelBody, PanelRow, ToggleControl, SelectControl } from "@wordpress/components";

export default class ProductSetting extends Component {
	state = {
		...this.props.configs,
	};

	onChange() {
		const { onChange } = this.props;
		onChange(this.state);
	}

	render() {
		const { productQuantity, removeProduct, priceTag, totalPrice, subtotalPrice, shippingPrice, taxPrice, suggestProduct } = this.state;
		return (
			<PanelBody className="bg-white" title={__("Product settings", "vnh_textdomain")}>
				<PanelRow>
					<ToggleControl
						label={__("Change product quantity", plugin.trans)}
						checked={productQuantity}
						onChange={() => this.setState({ productQuantity: !productQuantity }, () => this.onChange())}
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={__("Remove product", plugin.trans)}
						checked={removeProduct}
						onChange={() => this.setState({ removeProduct: !removeProduct }, () => this.onChange())}
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={__("Enable price tag", plugin.trans)}
						checked={priceTag}
						onChange={() => this.setState({ priceTag: !priceTag }, () => this.onChange())}
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={__("Enable total price", plugin.trans)}
						checked={totalPrice}
						onChange={() => this.setState({ totalPrice: !totalPrice }, () => this.onChange())}
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={__("Enable subtotal price", plugin.trans)}
						checked={subtotalPrice}
						onChange={() => this.setState({ subtotalPrice: !subtotalPrice }, () => this.onChange())}
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={__("Enable shipping price", plugin.trans)}
						checked={shippingPrice}
						onChange={() => this.setState({ shippingPrice: !shippingPrice }, () => this.onChange())}
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={__("Enable tax price", plugin.trans)}
						checked={taxPrice}
						onChange={() => this.setState({ taxPrice: !taxPrice }, () => this.onChange())}
					/>
				</PanelRow>
			</PanelBody>
		);
	}
}
