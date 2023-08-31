import buildClient from "../api/build-client";

export default function LandingPage({ currentUser }) {
	return (
		<h1>
			{currentUser ? `Hi ${currentUser.username}!` : "You are not signed in"}
		</h1>
	);
}

LandingPage.getInitialProps = async (context) => {
	console.log("Landing page");
	const client = buildClient(context);
	const { data } = await client.get("/api/users/currentuser");

	return data;
};
