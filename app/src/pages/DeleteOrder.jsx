import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DeleteOrder() {
	return (
		<>
			<Navbar variant="admin" />
			<br />
			<div className="row">
				<div className="col-md-6">
					<div className="card card-body">
						<p>Are you sure you want to delete this order?</p>
						<form action="" method="POST">
							<Link className="btn btn-warning" to="/dashboard">Cancel</Link>
							<input className="btn btn-danger" type="submit" value="Confirm" />
						</form>
					</div>
				</div>
			</div>
			<br />
		</>
	);
}
