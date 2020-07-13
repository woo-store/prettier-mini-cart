import apiFetch from "@wordpress/api-fetch";

export default class App extends Component {
  componentDidMount() {
	 apiFetch({path: '/src/v1/settings/products'}).then((settings) => {
		console.log(settings);
		// this.setState({
		//   configs: {...settings},
		//   isAPILoaded: true,
		// });
	 });
  }

  render() {

	 return (
		<div className="fixed position-cart">
		  <div className="max-w-sm rounded overflow-hidden shadow-lg">
			 <div className="px-6 py-4">
				<div className="font-bold text-xl mb-2">The Coldest Sunset</div>
				<p className="text-gray-700 text-base">
				  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
				  perferendis eaque, exercitationem praesentium nihil.
				</p>
			 </div>
			 <div className="px-6 py-4">
				  <span
					 className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
				<span
				  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
				<span
				  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
			 </div>
		  </div>
		</div>
	 )
  }
}
