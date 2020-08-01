import { useEffect, useState } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { isEmpty } from "ramda";
import apiFetch from "@wordpress/api-fetch";
import useSettings from "../hooks/useSettings";
import Cart from "./config/cart";
import Product from "./config/product";

export default function App() {
	const [{ settings }, setSettings] = useSettings();
	const [saving, setSaving] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// early exit
		if (isEmpty(settings) || saving === false) return;

		setLoading(true);
		apiFetch({ path: pluginApiPath, method: "POST", parse: false, data: settings }).finally(() => {
			setSaving(false);
			setLoading(false);
			console.warn("Settings saved");
		});
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
					<Cart settings={settings} setSettings={setSettings} />
					<Product settings={settings} setSettings={setSettings} />
					<Button className="mt-3" isPrimary isLarge disabled={loading} onClick={() => setSaving(true)}>
						{__("Save Settings", "vnh_textdomain")}
					</Button>
				</div>
			</div>
		</>
	);
}
