import React, { useState, useEffect } from "react";
import axios from "axios";
import { IPerCoin } from "../interfaces/IPerCoin";
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from "react-icons/fa";
import DOMPurify from 'dompurify'

import {
	Sparklines,
	SparklinesBars,
	SparklinesLine,
	SparklinesSpots,
} from "react-sparklines";
import { useParams } from "react-router-dom";

const CoinPage: React.FC = () => {
	const [coin, setCoin] = useState<IPerCoin | undefined>();
	const params = useParams();

	const url =
		`https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

	useEffect(() => {
		axios.get(url).then((res) => {
			setCoin(res.data);
		});
	}, []);

	return (
		<div className="rounded-div my-12 py-8">
			<div className="flex py-8">
				<img
					className="w-20 mr-8"
					src={coin && coin && coin.image?.large}
					alt="/"
				/>
				<div className="flex flex-col justify-center">
					<p className=" text-3xl font-bold">
						{coin?.name} Price
					</p>
					<p>
						(
						{coin &&
							coin.symbol?.toUpperCase()}{" "}
						/ USD)
					</p>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<div>
					<div className="flex justify-between">
						{coin &&
						coin.market_data
							?.current_price ? (
							<p className="text-3xl font-bold">
								$
								{coin &&
									coin.market_data.current_price.usd.toLocaleString()}
							</p>
						) : null}
						<p>7 Day</p>
					</div>

					<div>
						<Sparklines
							data={
								coin &&
								coin.market_data
									?.sparkline_7d
									.price
							}>
							<SparklinesLine color="teal" />
						</Sparklines>
					</div>

					<div className="flex justify-between py-4">
						<div>
							<p className="text-gray-500 text-sm">
								Market Cap
							</p>
							{coin &&
							coin.market_data
								?.market_cap ? (
								<p>
									$
									{coin &&
										coin.market_data.market_cap.usd.toLocaleString()}
								</p>
							) : null}
						</div>
						<div>
							<p className="text-gray-500 text-sm">
								Volume (24h)
							</p>
							{coin &&
							coin.market_data
								?.market_cap ? (
								<p>
									$
									{coin &&
										coin.market_data.total_volume.usd.toLocaleString()}
								</p>
							) : null}
						</div>
					</div>

					<div className="flex justify-between py-4">
						<div>
							<p className="text-gray-500 text-sm">
								24h High
							</p>
							{coin &&
							coin.market_data
								?.high_24h ? (
								<p>
									$
									{coin &&
										coin.market_data.high_24h.usd.toLocaleString()}
								</p>
							) : null}
						</div>
						<div>
							<p className="text-gray-500 text-sm">
								24h Low
							</p>
							{coin &&
							coin.market_data
								?.low_24h ? (
								<p>
									$
									{coin &&
										coin.market_data.low_24h.usd.toLocaleString()}
								</p>
							) : null}
						</div>
					</div>
				</div>

				<div>
					<p className="text-xl font-bold">
						Market Stats
					</p>
					<div className="flex justify-between py-4">
						<div>
							<p className="text-gray-500 text-sm">
								Market Rank
							</p>
							{coin &&
								coin.market_cap_rank}
						</div>
						<div>
							<p className="text-gray-500 text-sm">
								Hashing
								Algorithm
							</p>
							{coin &&
							coin.hashing_algorithm ? (
								<p>
									{coin &&
										coin.hashing_algorithm}
								</p>
							) : null}
						</div>
						<div>
							<p className="text-gray-500 text-sm">
								Trust Score
							</p>
							{coin &&
							coin.tickers ? (
								<p>
									{coin &&
										coin.liquidity_score.toFixed(
											2
										)}
								</p>
							) : null}
						</div>
					</div>

					<div className="flex justify-between py-4">
						<div>
							<p className="text-gray-500 text-sm">
								Price Change
								(24h)
							</p>
							{coin &&
							coin.market_data ? (
								<p>
									{coin &&
										coin.market_data.price_change_percentage_24h.toFixed(
											2
										)}
									%
								</p>
							) : null}
						</div>
						<div>
							<p className="text-gray-500 text-sm">
								Price Change
								(7d)
							</p>
							{coin &&
							coin.market_data ? (
								<p>
									{coin &&
										coin.market_data.price_change_percentage_7d.toFixed(
											2
										)}
									%
								</p>
							) : null}
						</div>
						<div>
							<p className="text-gray-500 text-sm">
								Price Change
								(14d)
							</p>
							{coin &&
							coin.market_data ? (
								<p>
									{coin &&
										coin.market_data.price_change_percentage_14d.toFixed(
											2
										)}
									%
								</p>
							) : null}
						</div>
					</div>

					<div className="flex justify-between py-4">
						<div>
							<p className="text-gray-500 text-sm">
								Price Change
								(30d)
							</p>
							{coin &&
							coin.market_data ? (
								<p>
									{coin &&
										coin.market_data.price_change_percentage_30d.toFixed(
											2
										)}
									%
								</p>
							) : null}
						</div>
						<div>
							<p className="text-gray-500 text-sm">
								Price Change
								(60d)
							</p>
							{coin &&
							coin.market_data ? (
								<p>
									{coin &&
										coin.market_data.price_change_percentage_60d.toFixed(
											2
										)}
									%
								</p>
							) : null}
						</div>
						<div>
							<p className="text-gray-500 text-sm">
								Price Change
								(1y)
							</p>
							{coin &&
							coin.market_data ? (
								<p>
									{coin &&
										coin.market_data.price_change_percentage_1y.toFixed(
											2
										)}
									%
								</p>
							) : null}
						</div>
					</div>

					<div className="flex justify-around p-8 text-accent">
						<FaTwitter size={25} className='cursor-pointer hover:scale-110 duration-300' />
						<FaFacebook  size={25} className='cursor-pointer hover:scale-110 duration-300'/>
						<FaReddit size={25} className='cursor-pointer hover:scale-110 duration-300' />
						<FaGithub  size={25} className='cursor-pointer hover:scale-110 duration-300'/>
					</div>
				</div>
			</div>

			{/* Description */}
			<div className="py-4">
				<p className="text-xl font-bold">
					About {coin && coin.name}
				</p>
				<p
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(
							coin && coin.description
								? coin
										.description
										.en
								: ""
						),
					}}></p>
			</div>
		</div>
	);
};

export default CoinPage;
