import { useEffect, useState } from "@wordpress/element";
import { Button } from "@wordpress/components";
import isEmpty from "lodash/isEmpty";

import { saveSettings, useSettings } from "./helpers";

import CartSetting from "./cart-setting";
import ProductSetting from "./product-setting";

const App = () => {
	const { loading, setLoading, settings, setSettings } = useSettings();
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		setLoading(true);
		!isEmpty(settings) && saveSettings(settings, setLoading);
	}, [saving]);

	return (
		<>
			<div className="bg-white py-6 mb-4">
				<div className="container w-9/12 lg:w-7/12 mx-auto">
					<div className="flex items-center">
						<h1>{pluginName}</h1>
						<div className="ml-3 text-xs rounded font-light bg-gray-200 px-1 border-gray-300">v{pluginVersion}</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-2 px-3">
				<div className="sm:col-span-3 md:col-span-1">{/*<Preview />*/}</div>
				<div className="sm:col-span-3 md:col-span-2">
					<CartSetting settings={settings} setSettings={setSettings} />
					<ProductSetting settings={settings} setSettings={setSettings} />
					<Button className="mt-3" isPrimary isLarge disabled={loading} onClick={() => setSaving(true)}>
						{__("Save Settings", "vnh_textdomain")}
					</Button>
				</div>
			</div>
		</>
	);
};

export default App;
