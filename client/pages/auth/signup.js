import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

export default function Signup() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { doRequest, errors } = useRequest({
		url: "/api/users/signup",
		method: "post",
		body: { username, email, password },
		onSuccess: () => Router.push("/"),
	});

	const onSubmit = async (event) => {
		event.preventDefault();

		await doRequest();
	};

	return (
		<form onSubmit={onSubmit}>
			<h1>Sign up</h1>
			<div className="form-group">
				<label htmlFor="email">Username</label>
				<input
					id="username"
					type="text"
					className="form-control"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					autoComplete="username"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="email">Email address</label>
				<input
					id="email"
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="off"
				/>
			</div>
			{errors}
			<button className="btn btn-primary">Sign up</button>
		</form>
	);
}
