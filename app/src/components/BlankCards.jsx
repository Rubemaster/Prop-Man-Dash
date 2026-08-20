export default function BlankCards() {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 300px))",
				justifyContent: "center",
				gap: "46px",
				paddingLeft: "16px",
				paddingRight: "16px",
			}}
		>
			<div className="card" style={{ height: "200px" }} />
			<div className="card" style={{ height: "200px" }} />
			<div className="card" style={{ height: "200px" }} />
		</div>
	);
}
