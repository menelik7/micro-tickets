import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

export default function SignOut() {
	const { doRequest } = useRequest({
		url: "/api/users/signout",
		method: "post",
		body: {},
		onSuccess: () => Router.push("/"),
	});

	useEffect(() => {
		doRequest();
	}, []);

	return "Signin you out...";
}
