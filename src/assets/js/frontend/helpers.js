import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

export const useSettings = () => {
	const [settings, setSettings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		setLoading(true);
		const settings = await apiFetch({ path: pluginApiPath });
		setSettings(settings);
		setLoading(false);
	}, []);

	return { loading, setLoading, settings, setSettings };
};

export const saveSettings = async (data, setLoading) => {
	await apiFetch({ path: pluginApiPath, method: "POST", parse: false, data });
	setLoading(false);
};
