import { Link } from "react-router-dom";

export default function StatusCards({ total = 0, delivered = 0, pending = 0 }) {
	return (
		<div className="row">
			<div className="col">
				<div className="col-md">
					<Link to="/properties" style={{ color: "inherit", textDecoration: "none" }}>
						<div className="card text-center text-white mb-3" id="total-orders" style={{ height: "200px" }}>
							<div className="card-header"><h5 className="card-title">Properties</h5></div>
							<div className="card-body"><h3 className="card-title">{total}</h3></div>
						</div>
					</Link>
				</div>
			</div>
			<div className="col">
				<div className="col-md">
					<Link to="/inspections-pending" style={{ color: "inherit", textDecoration: "none" }}>
						<div className="card text-center text-white mb-3" id="orders-delivered" style={{ height: "200px" }}>
							<div className="card-header"><h5 className="card-title">Inspections Pending</h5></div>
							<div className="card-body"><h3 className="card-title">{delivered}</h3></div>
						</div>
					</Link>
				</div>
			</div>
			<div className="col">
				<div className="col-md">
					<Link to="/results" style={{ color: "inherit", textDecoration: "none" }}>
						<div className="card text-center text-white mb-3" id="orders-pending" style={{ height: "200px" }}>
							<div className="card-header"><h5 className="card-title">Results</h5></div>
							<div className="card-body"><h3 className="card-title">{pending}</h3></div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
