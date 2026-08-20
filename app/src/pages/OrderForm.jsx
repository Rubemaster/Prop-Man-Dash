import Navbar from "../components/Navbar";

export default function OrderForm() {
	return (
		<>
			<Navbar variant="admin" />
			<br />
			<div className="row">
				<div className="col-md-6">
					<div className="card card-body">
						<form action="" method="POST">
							<select name="product" className="form-control mb-2">
								<option value="">Product...</option>
							</select>
							<select name="status" className="form-control mb-2">
								<option value="Pending">Pending</option>
								<option value="Out for delivery">Out for delivery</option>
								<option value="Delivered">Delivered</option>
							</select>
							<hr />
							<input type="submit" value="Submit" className="btn btn-primary" />
						</form>
					</div>
				</div>
			</div>
			<br />
		</>
	);
}
