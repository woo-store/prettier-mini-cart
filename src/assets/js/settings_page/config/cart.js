import { ColorPalette, PanelBody, PanelRow, SelectControl, ToggleControl } from "@wordpress/components";
import { positions } from "../config";

const Cart = ({ settings, setSettings }) => {
	const { enableCartPrice, enableCart, position, colorMain, colorText } = settings;

	const updateSettings = (data) => setSettings({ ...settings, ...data });

	return (
		<PanelBody className="bg-white mb-4" title={__("Cart settings", "vnh_textdomain")}>
			<PanelRow>
				<ToggleControl
					label={__("Enable to show sticky cart", plugin.trans)}
					checked={enableCart}
					onChange={() => updateSettings({ enableCart: !enableCart })}
				/>
			</PanelRow>
			<PanelRow>
				<SelectControl
					label={__("Sticky cart position", plugin.trans)}
					value={position}
					options={positions}
					onChange={(value) => updateSettings({ position: value })}
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={__("Enable cart price", plugin.trans)}
					checked={enableCartPrice}
					onChange={() => updateSettings({ enableCartPrice: !enableCartPrice })}
				/>
			</PanelRow>
			<PanelRow className="block">
				<div className="block w-full">Background icon cart</div>
				<div className="block w-1/2">
					<ColorPalette colors={[]} value={colorMain} onChange={(value) => updateSettings({ colorMain: value.hex })} clearable={false} />
				</div>
			</PanelRow>
			<PanelRow className="block">
				<div className="block w-full">Color text cart</div>
				<div className="block w-1/2">
					<ColorPalette colors={[]} value={colorText} onChange={(colorText) => updateSettings({ colorText })} clearable={false} />
				</div>
			</PanelRow>
		</PanelBody>
	);
};

export default Cart;
