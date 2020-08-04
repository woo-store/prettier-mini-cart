import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
	initialState: {
		loading: false,
	},
	actions: {
		setLoading: () => ({ setState, getState }) => {
			setState({
				loading: !getState().loading,
			});
		},
	},
});

export const useStore = createHook(Store);
