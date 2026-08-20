import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CustomerDetail() {
	const { id } = useParams();

	return (
		<>
			<Navbar variant="admin" />
			<br />
			<div className="row">
				<div className="col-md">
					<div className="card card-body">
						<h5>Customer: {id}</h5>
						<hr />
						<a className="btn btn-outline-info btn-sm btn-block" href="#">Update Customer</a>
						<Link className="btn btn-outline-info btn-sm btn-block" to={`/order-form/${id}`}>Place Order</Link>
					</div>
				</div>
				<div className="col-md">
					<div className="card card-body">
						<h5>Contact Information</h5>
						<hr />
						<p>Email: </p>
						<p>Phone: </p>
					</div>
				</div>
				<div className="col-md">
					<div className="card card-body">
						<h5>Total Orders</h5>
						<hr />
						<h1 className="text-center" style={{ padding: 10 }}>0</h1>
					</div>
				</div>
			</div>

			<br />
			<div className="row">
				<div className="col">
					<div className="card card-body">
						<form method="get">
							<input type="date" name="start_date" className="form-control mb-2" placeholder="Start date" />
							<input type="date" name="end_date" className="form-control mb-2" placeholder="End date" />
							<input type="text" name="note" className="form-control mb-2" placeholder="Note contains..." />
							<button className="btn btn-primary" type="submit">Search</button>
						</form>
					</div>
				</div>
			</div>
			<br />

			<div className="row">
				<div className="col-md">
					<div className="card card-body">
						<table className="table table-sm">
							<tbody>
								<tr>
									<th>Product</th>
									<th>Category</th>
									<th>Note</th>
									<th>Date Orderd</th>
									<th>Status</th>
									<th>Update</th>
									<th>Remove</th>
								</tr>
								{/* order rows render here once the backend API is wired up */}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<br />
		</>
	);
}
