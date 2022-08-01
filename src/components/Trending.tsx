import React, { useEffect, useState } from "react";
import axios from "axios";
import { ITrending } from "../interfaces/ITrending";

const Trending: React.FC = () => {
	const [trend, setTrend] = useState<ITrending[]>([]);
	const url = "https://api.coingecko.com/api/v3/search/trending";

	useEffect(() => {
		axios.get(url).then((res) => {
			setTrend(res.data.coins);
		});
	}, [url]);
	return (
		<>
			<div className="rounded-div my-12 py-8 text-primary">
				<h1 className="text-2xl font-bold py-4">
					Trending Coins
				</h1>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{trend.map((coin) => {
						return (
							<div key={coin.item.coin_id} className="rounded-div p-4 hover:scale-105 duration-300 ease-in-out">
								<div className="flex w-full items-center justify-between">
									<div className="flex">
										<img
											src={
												coin
													.item
													.small
											}
											className='mr-4 rounded-full'
											alt="/"
										/>
										<div>
											<p className="font-bold">
												{
													coin
														.item
														.name
												}
											</p>
											<p>
												{
													coin
														.item
														.symbol
												}
											</p>
										</div>
									</div>
									<div className="flex items-center">
										<img
											className="w-4 mr-2"
											src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
											alt="/"
										/>
										<p>
											{coin.item.price_btc.toFixed(
												7
											)}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Trending;
