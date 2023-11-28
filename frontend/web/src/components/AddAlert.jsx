import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertDismissible(show, itemName) {
	return (
		<>
			<Alert show={show} variant="success">
				{itemName} added!
			</Alert>

			{!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
		</>
	);
}

export default AlertDismissible;
