import Navbar from "../components/Navbar";
import StatusCards from "../components/StatusCards";

export default function Dashboard() {
	return (
		<>
			<Navbar variant="admin" />
			<br />
			<StatusCards />
			<br />
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-5">
						<h5>CUSTOMERS:</h5>
						<hr />
						<div className="card card-body">
							<a className="btn btn-primary btn-sm btn-block" href="#">Create Customer</a>
							<table className="table table-sm">
								<tbody>
									<tr>
										<th></th>
										<th>Customer</th>
										<th>Phone</th>
									</tr>
									{/* customer rows render here once the backend API is wired up */}
								</tbody>
							</table>
						</div>
					</div>

					<div className="col-md-7">
						<h5>LAST 5 ORDERS</h5>
						<hr />
						<div className="card card-body">
							<table className="table table-sm">
								<tbody>
									<tr>
										<th>Product</th>
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
			</div>
			<br />
		</>
	);
}
