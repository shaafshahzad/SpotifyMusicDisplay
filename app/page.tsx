"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Landing = () => {
	const router = useRouter();

	const handleLogin = async () => {
		router.push("/api/auth");
	};

	return (
		<div>
			<button onClick={handleLogin}>Hello</button>
		</div>
	);
};

export default Landing;
