import React from "react";
import CoinSearch from "../components/CoinSearch";
import Trending from "../components/Trending";
import { ICoin } from "../interfaces/ICoin";

interface IProps {
  coins: ICoin[]
}

const Home: React.FC<IProps> = ({coins}) => {
	return (
		<>
			<CoinSearch coins={coins} />
			<Trending />
		</>
	);
};

export default Home;
