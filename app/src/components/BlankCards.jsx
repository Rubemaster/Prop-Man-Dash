export default function BlankCards() {
	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: "16px", paddingLeft: "16px", paddingRight: "16px" }}>
			<div className="card" style={{ flex: "1 1 200px", height: "100px" }} />
			<div className="card" style={{ flex: "1 1 200px", height: "100px" }} />
			<div className="card" style={{ flex: "1 1 200px", height: "100px" }} />
		</div>
	);
}
