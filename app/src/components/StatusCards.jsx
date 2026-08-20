import { Link } from "react-router-dom";

export default function StatusCards({ total = 0, delivered = 0, pending = 0, hidePropertiesContent = false, propertiesRepeat = 1 }) {
	return (
		<div className="row">
			{Array.from({ length: propertiesRepeat }).map((_, i) => (
				<div className="col" key={`properties-${i}`}>
					<div className="col-md">
						<Link to="/properties" style={{ color: "inherit", textDecoration: "none" }}>
							<div className="card text-center text-white mb-3" id="total-orders" style={{ height: "180px" }}>
								<div className="card-header"><h5 className="card-title properties-heading-black">Properties</h5></div>
								{!hidePropertiesContent && (
									<div className="card-body"><h3 className="card-title">{total}</h3></div>
								)}
							</div>
						</Link>
					</div>
				</div>
			))}
			<div className="col">
				<div className="col-md">
					<Link to="/inspections-pending" style={{ color: "inherit", textDecoration: "none" }}>
						<div className="card text-center text-white mb-3" id="orders-delivered" style={{ height: "180px" }}>
							<div className="card-header"><h5 className="card-title">Inspections Pending</h5></div>
							<div className="card-body"><h3 className="card-title">{delivered}</h3></div>
						</div>
					</Link>
				</div>
			</div>
			<div className="col">
				<div className="col-md">
					<Link to="/results" style={{ color: "inherit", textDecoration: "none" }}>
						<div className="card text-center text-white mb-3" id="orders-pending" style={{ height: "180px" }}>
							<div className="card-header"><h5 className="card-title">Results</h5></div>
							<div className="card-body"><h3 className="card-title">{pending}</h3></div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
