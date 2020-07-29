import { PanelBody, PanelRow, ToggleControl } from "@wordpress/components";
const productSetting = ({ settings, setSettings }) => {
	const { productQuantity, removeProduct, priceTag, totalPrice, subtotalPrice, shippingPrice, taxPrice } = settings;

	const updateSettings = (data) => setSettings({ ...settings, ...data });

	return (
		<PanelBody className="bg-white" title={__("Product settings", "vnh_textdomain")}>
			<PanelRow>
				<ToggleControl
					label={__("Change product quantity", plugin.trans)}
					checked={productQuantity}
					onChange={() => updateSettings({ productQuantity: !productQuantity })}
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={__("Remove product", plugin.trans)}
					checked={removeProduct}
					onChange={() => updateSettings({ removeProduct: !removeProduct })}
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={__("Enable price tag", plugin.trans)}
					checked={priceTag}
					onChange={() => updateSettings({ priceTag: !priceTag })}
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={__("Enable total price", plugin.trans)}
					checked={totalPrice}
					onChange={() => updateSettings({ totalPrice: !totalPrice })}
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={__("Enable subtotal price", plugin.trans)}
					checked={subtotalPrice}
					onChange={() => updateSettings({ subtotalPrice: !subtotalPrice })}
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={__("Enable shipping price", plugin.trans)}
					checked={shippingPrice}
					onChange={() => updateSettings({ shippingPrice: !shippingPrice })}
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={__("Enable tax price", plugin.trans)}
					checked={taxPrice}
					onChange={() => updateSettings({ taxPrice: !taxPrice })}
				/>
			</PanelRow>
		</PanelBody>
	);
};

export default productSetting;
