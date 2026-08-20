import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function StatusCards({ total = 0, delivered = 0, pending = 0 }) {
	const rowRef = useRef(null);

	useEffect(() => {
		const row = rowRef.current;
		if (!row) return;
		console.warn("[statuscards-debug] row width", row.getBoundingClientRect().width);
		row.querySelectorAll(":scope > .col").forEach((col, i) => {
			console.warn(`[statuscards-debug] col[${i}] width`, col.getBoundingClientRect().width, "computed min-width", getComputedStyle(col).minWidth);
			const card = col.querySelector(".card");
			console.warn(`[statuscards-debug] card[${i}] width`, card.getBoundingClientRect().width, "computed min-width", getComputedStyle(card).minWidth, "computed width", getComputedStyle(card).width);
		});
	});

	return (
		<div className="row" style={{ flexWrap: "wrap" }} ref={rowRef}>
			<div className="col" style={{ minWidth: "200px" }}>
				<div className="col-md">
					<Link to="/properties" style={{ color: "inherit", textDecoration: "none" }}>
						<div className="card text-center text-white mb-3" id="total-orders" style={{ minWidth: "200px", minHeight: "200px" }}>
							<div className="card-header"><h5 className="card-title">Properties</h5></div>
							<div className="card-body"><h3 className="card-title">{total}</h3></div>
						</div>
					</Link>
				</div>
			</div>
			<div className="col" style={{ minWidth: "200px" }}>
				<div className="col-md">
					<Link to="/inspections-pending" style={{ color: "inherit", textDecoration: "none" }}>
						<div className="card text-center text-white mb-3" id="orders-delivered" style={{ minWidth: "200px", minHeight: "200px" }}>
							<div className="card-header"><h5 className="card-title">Inspections Pending</h5></div>
							<div className="card-body"><h3 className="card-title">{delivered}</h3></div>
						</div>
					</Link>
				</div>
			</div>
			<div className="col" style={{ minWidth: "200px" }}>
				<div className="col-md">
					<Link to="/results" style={{ color: "inherit", textDecoration: "none" }}>
						<div className="card text-center text-white mb-3" id="orders-pending" style={{ minWidth: "200px", minHeight: "200px" }}>
							<div className="card-header"><h5 className="card-title">Results</h5></div>
							<div className="card-body"><h3 className="card-title">{pending}</h3></div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
