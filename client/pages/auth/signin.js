import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

export default function Signin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { doRequest, errors } = useRequest({
		url: "/api/users/signin",
		method: "post",
		body: { email, password },
		onSuccess: () => Router.push("/"),
	});

	const onSubmit = async (event) => {
		event.preventDefault();

		await doRequest();
	};

	return (
		<form onSubmit={onSubmit}>
			<h1>Sign in</h1>
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
			<button className="btn btn-primary">Sign in</button>
		</form>
	);
}
