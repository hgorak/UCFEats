import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../api.js";

import "../styles.scss";

function Verification() {
	let { verificationToken } = useParams();
	const [verified, setVerified] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const verifyEmail = async () => {
			const response = await fetch(API_URL + "/api/user/verification/" + verificationToken, {
				method: "GET",
				headers: { "Content-Type": "application/JSON" },
			});

			if (response.ok) {
				setVerified(true);
			}

			setLoading(false);
		};

		if (!verified) verifyEmail();
	}, [verificationToken, verified, setVerified]);

	if (loading) {
		return <div className="auth-container">Loading...</div>;
	}

	if (verified) {
		return (
			<div className="forgot-box forgot-box-sent">
				<div className="auth-header">
					<h1>Email Verified</h1>
					<span>
						Let's use your new account! <Link to="/auth/login">Log in</Link>
					</span>
				</div>
			</div>
		);
	} else {
		return (
			<div className="forgot-box forgot-box-sent">
				<h1>Verification Unsuccessful</h1>
				<span>We just sent you another verification email.</span>
			</div>
		);
	}
}

export default Verification;
