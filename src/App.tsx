import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Account from "./Routes/Account";
import Home from "./Routes/Home";
import Signin from "./Routes/Signin";
import Signup from "./Routes/Signup";
import axios from "axios";
import { useEffect, useState } from "react";
import CoinPage from "./Routes/CoinPage";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const [coins, setCoins] = useState([]);

	const url =
		"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true";

	useEffect(() => {
		axios.get(url).then((res) => {
			setCoins(res.data);
		});
	}, [url]);
	return (
		<ThemeProvider initialTheme="">
			<AuthContextProvider>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={<Home coins={coins} />}
					/>
					<Route
						path="/signin"
						element={<Signin />}
					/>
					<Route
						path="/signup"
						element={<Signup />}
					/>
					<Route
						path="/account"
						element={
							<ProtectedRoute>
								<Account />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/coin/:coinId"
						element={<CoinPage />}>
						<Route path=":coinId" />
					</Route>
				</Routes>
				<Footer />
			</AuthContextProvider>
		</ThemeProvider>
	);
}

export default App;
