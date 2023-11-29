import React from "react";

import "../styles.scss";

const navigate = Navigate();

function VerifiedBox({ children }) {
	return <div className="forgot-box forgot-box-sent">{children}</div>;
}

export default VerifiedBox;
