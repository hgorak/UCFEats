import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../api.js";
import VerifiedBox from "./VerifiedBox.jsx";

import "../styles.scss";

function Verification() {
	let { verificationToken } = useParams();
	const [verified, setVerified] = useState(false);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	useEffect(() => {
		const verifyEmail = async () => {
			const response = await fetch(API_URL + "/api/user/verification/" + verificationToken, {
				method: "GET",
				headers: { "Content-Type": "application/JSON" },
			});

			if (response.ok) {
				setVerified(true);

				setTimeout(() => navigate("/login"), 3000);
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
			<VerifiedBox>
				<div className="auth-header">
					<h1>Email Verified</h1>
					<span>
						Redirecting you to your dashboard now. Click <Link to="/loading">here</Link>{" "}
						if you are not redirected automatically.
					</span>
				</div>
			</VerifiedBox>
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
