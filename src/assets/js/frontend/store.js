import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
	// value of the store on initialisation
	initialState: {
		cart: {},
	},
	// actions that trigger store mutation
	actions: {
		setCart: () => ({ setState, getState }) => {
			// mutate state synchronously
			setState({
				cart: getState(),
			});
		},
	},
	// optional, mostly used for easy debugging
	name: "cart",
});

export const useCounter = createHook(Store);
