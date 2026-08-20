import { Link } from "react-router-dom";

const CARD_STYLE = { flex: "0 0 200px", width: "200px", height: "200px" };

export default function StatusCards({ total = 0, delivered = 0, pending = 0 }) {
	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
			<Link to="/properties" style={{ color: "inherit", textDecoration: "none" }}>
				<div className="card text-center text-white" id="total-orders" style={CARD_STYLE}>
					<div className="card-header"><h5 className="card-title">Properties</h5></div>
					<div className="card-body"><h3 className="card-title">{total}</h3></div>
				</div>
			</Link>
			<Link to="/inspections-pending" style={{ color: "inherit", textDecoration: "none" }}>
				<div className="card text-center text-white" id="orders-delivered" style={CARD_STYLE}>
					<div className="card-header"><h5 className="card-title">Inspections Pending</h5></div>
					<div className="card-body"><h3 className="card-title">{delivered}</h3></div>
				</div>
			</Link>
			<Link to="/results" style={{ color: "inherit", textDecoration: "none" }}>
				<div className="card text-center text-white" id="orders-pending" style={CARD_STYLE}>
					<div className="card-header"><h5 className="card-title">Results</h5></div>
					<div className="card-body"><h3 className="card-title">{pending}</h3></div>
				</div>
			</Link>
		</div>
	);
}
