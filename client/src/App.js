import "./App.css";
//import { Route, Redirect } from "react-router-dom";
import { Redirect, Route } from "react-router";

import { Nav } from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import DogDetails from "./components/DogDetails/DogDetails";
import AddDog from "./components/AddDog/AddDog";
import HomePage from "./components/HomePage/HomePage";
import About from "./components/About/About";

function App() {
	return (
		<div className="App">
			<Redirect from="/" to="/home"></Redirect>
			<Route exact path={["/", "/home"]}>
				<LandingPage />
			</Route>
			<Route path={["/", "/home", "/dog", "/add", "/about"]}>
				<Nav />
			</Route>
			<Route exact path={["/", "/home"]}>
				<HomePage />
			</Route>
			<Route exact path="/dogs/:id">
				<DogDetails />
			</Route>
			<Route exact path="/add">
				<AddDog />
			</Route>
			<Route exact path="/about">
				<About />
			</Route>
		</div>
	);
}

export default App;
