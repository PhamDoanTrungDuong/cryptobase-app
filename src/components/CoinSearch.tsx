import React, { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { ICoin } from "../interfaces/ICoin";
import CoinItems from "./CoinItems";

interface IProps {
	coins: ICoin[];
}

const CoinSearch: React.FC<IProps> = ({ coins }) => {
	const [keyword, setKeyword] = useState('')
	return (
		<div className="rounded-div mt-5">
			{/* Search */}
			<div className="flex flex-col md:flex-row justify-between items-center pt-4 pb-6 text-center md:text-right">
				<h1 className="text-2xl md:text-xl font-bold my-2">Search Crypto</h1>
				<form>
					<input className="w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl" onChange={(e) => setKeyword(e.target.value)}
						type="text"
						placeholder="Search a coin"
					/>
				</form>
			</div>

			{/* Coins Table */}
			<table className="w-full border-collapse text-center">
				<thead>
					<tr className="border-b">
						<th></th>
						<th className="px-4">#</th>
						<th className="text-left">Coin</th>
						<th></th>
						<th>Price</th>
						<th>24h</th>
						<th className="hidden md:table-cell">24h volume</th>
						<th className="hidden sm:table-cell">Mkt</th>
						<th>Last 7 Days</th>
					</tr>
				</thead>
				<tbody>
					{coins.filter((value) => {
						if(keyword === ''){
							return value
						}else if(value.name.toLowerCase().includes(keyword.toLowerCase())){
							return value
						}
					}).map((coin) => {
						return (
							<CoinItems key={coin.id} coin={coin} />
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default CoinSearch;
