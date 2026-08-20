import Navbar from "../components/Navbar";

export default function Products() {
	return (
		<>
			<Navbar variant="admin" />
			<br />
			<div className="row justify-content-center">
				<div className="col-md-10">
					<div className="card card-header bg-info border-dark">
						<h5>Products</h5>
					</div>
					<div className="card card-body bg-light border-dark">
						<table className="table">
							<tbody>
								<tr>
									<th>Product</th>
									<th>Category</th>
									<th>Price</th>
								</tr>
								{/* product rows render here once the backend API is wired up */}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<br />
		</>
	);
}
