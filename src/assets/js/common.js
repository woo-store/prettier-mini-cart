const numberOfDecimal = (number = 0) => {
	let result = 1;
	if (number === 0) {
		return result;
	}
	result += "0".repeat(number);
	return parseInt(result);
};

const formatPrice = (price = 1, minorUnit = 0, symbol = "$") => {
	return numberWithCommas((price / numberOfDecimal(minorUnit)).toFixed(minorUnit)) + symbol;
};
const numberWithCommas = (str) => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export { formatPrice };
