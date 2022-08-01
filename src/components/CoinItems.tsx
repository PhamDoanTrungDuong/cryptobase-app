//@ts-nocheck
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { ICoin } from "../interfaces/ICoin";
import {db} from '../firebase'
import { arrayUnion, doc, updateDoc} from 'firebase/firestore'
import { UserAuth } from "../context/AuthContext";

interface IProps {
	coin: ICoin;
}

const CoinItems: React.FC<IProps> = ({ coin }) => {
	const [savedCoin, setSavedCoin] = useState(false);
	const {user} = UserAuth();

	const coinRef = doc(db, 'users', `${user?.email}`);
	const saveCoin = async () => {
		if(user?.email){
			setSavedCoin(true);
			await updateDoc(coinRef, {
				watchList: arrayUnion({
					id: coin.id,
					name: coin.name,
					image: coin.image,
					rank: coin.market_cap_rank,
					symbol: coin.symbol
				})
			})
		}else {
			alert('Please sign in to save a coin to yout watch list')
		}
	}

	return (
		<>
			<tr className="h-[80px] border-b overflow-hidden">
				<td onClick={saveCoin}>
					{savedCoin ? <AiFillStar className="cursor-pointer text-orange-500" /> : <AiOutlineStar className="cursor-pointer" />}
				</td>
				<td>{coin.market_cap_rank}</td>
				<td>
					<Link to={`/coin/${coin.id}`}>
						<div className="flex items-center">
							<img
								src={coin.image}
								alt={coin.id}
								className="w-7 mr-2 rounded-full"
							/>
							<p className="hidden sm:table-cell">
								{coin.name}
							</p>
						</div>
					</Link>
				</td>
				<td>{coin.symbol.toUpperCase()}</td>
				<td>${coin.current_price.toLocaleString()}</td>
				<td>
					<p
						className={
							coin.price_change_percentage_24h >
							0
								? "text-green-600"
								: "text-red-600"
						}>
						{coin.price_change_percentage_24h.toFixed(
							1
						)}
						%
					</p>
				</td>
				<td className="w-[180px] hidden md:table-cell">
					${coin.total_volume.toLocaleString()}
				</td>
				<td className="w-[180px] hidden sm:table-cell">
					${coin.market_cap.toLocaleString()}
				</td>
				<td>
					<Sparklines
						data={
							coin.sparkline_in_7d
								.price
						}>
						<SparklinesLine color="teal" />
						<SparklinesSpots />
					</Sparklines>
				</td>
			</tr>
		</>
	);
};

export default CoinItems;
