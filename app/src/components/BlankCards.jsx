export default function BlankCards() {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 300px))",
				gap: "16px",
				paddingLeft: "16px",
				paddingRight: "16px",
			}}
		>
			<div className="card" style={{ height: "100px" }} />
			<div className="card" style={{ height: "100px" }} />
			<div className="card" style={{ height: "100px" }} />
		</div>
	);
}
