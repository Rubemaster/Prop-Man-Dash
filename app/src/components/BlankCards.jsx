export default function BlankCards() {
	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: "16px", paddingLeft: "16px", paddingRight: "16px" }}>
			<div className="card" style={{ flex: "0 0 200px", width: "200px", height: "100px" }} />
			<div className="card" style={{ flex: "0 0 200px", width: "200px", height: "100px" }} />
			<div className="card" style={{ flex: "0 0 200px", width: "200px", height: "100px" }} />
		</div>
	);
}
