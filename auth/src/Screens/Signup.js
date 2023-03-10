import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";

import { useNavigate } from "react-router-dom";
export default function SignUp() {
const [username, setUsername] = React.useState("");
const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");
const [radio, setRadio] = React.useState("");

const navigate = useNavigate();

const [accounts, setAccounts] = React.useState(null);
const [auth, setAuth] = React.useState(null);

const loadAccounts = async () => {
	let { auth, accounts } = await loadBlockchainData();

	setAccounts(accounts);
	setAuth(auth);
};

const signUp = async () => {
	if (!username || !email || !password || !radio) {
	alert("please fill all details");
	return;
	}
	var mailformat = /^\w+([\.-]?\w+)*@medicaps.ac.in$/;
	if (!email.match(mailformat)) {
	alert("please enter valid email address");
	return;
	}

	var passformat = /^\w{8,20}/;
	if (!password.match(passformat)) {
	alert("please enter valid password(minlength : 8)");
	return;
	}
	try {
	await auth.methods
		.createUser(username, email, password)
		.send({ from: accounts });

	localStorage.setItem("username", username);
	localStorage.setItem("email", email);
	navigate("/Home");
	} catch (e) {
	console.log(e.message);
	}
};
React.useEffect(() => {
	loadWeb3();
}, []);

React.useEffect(() => {
	loadAccounts();
}, []);

return (
	<div style={rootDiv}>
	<img
		src="/logo.png"
		style={image}
		alt="geeks"
	/>
	<input
		style={input}
		value={username}
		onChange={(e) => setUsername(e.target.value)}
		placeholder="Username"
		type="text"
	/>
	<input
		style={input}
		value={email}
		onChange={(e) => setEmail(e.target.value)}
		placeholder="Email"
		type="text"
	/>
	
	<input
		style={input}
		value={password}
		onChange={(e) => setPassword(e.target.value)}
		placeholder="Password"
		type="password"
		// minLength={8}
	/>
	
	<label for="radios">Are you 18+? </label>
	<input
		style={input}
		value={radio}
		onChange={(e) => setRadio(e.target.checked)}
		type="radio"
		id="radios"
		required
	/>

	<button style={button} onClick={signUp}>
		{" "}
		Sign Up
	</button>
	</div>
);
}

const rootDiv = {
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
height: "100vh",
backgroundImage: "url('/bg.webp')",
};

const input = {
width: 300,
padding: 10,
margin: 10,
borderRadius: 10,
outline: "none",
border: "2px solid grey",
fontSize: 17,
};

const button = {
width: 325,
padding: 10,
borderRadius: 10,
margin: 10,
cursor: "pointer",
fontSize: 17,
color: "white",
backgroundColor: "#0275d8", //#9D27CD
border: "none",
};

const image = {
width: 70,
height: 70,
objectFit: "contain",
borderRadius: 70,
};
