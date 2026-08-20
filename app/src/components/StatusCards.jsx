import { Link } from "react-router-dom";

export default function StatusCards({ total = 0, delivered = 0, pending = 0, projects = 0, hidePropertiesContent = false, propertiesRepeat = 1, showOtherCards = true, cardHeight = 180, trailingCards = 0, trailingCardHeight = 30, propertiesHeadingBlack = true, propertiesAsPlaceholder = false, showLearnMoreCard = false, firstPlaceholderHeight = null, firstPlaceholderImage = null, showProjectsCard = false }) {
	return (
		<div className="row">
			{Array.from({ length: propertiesRepeat }).map((_, i) => {
				const isImageCard = i === 0 && firstPlaceholderImage;
				const CardLink = isImageCard ? "a" : Link;
				const linkProps = isImageCard
					? { href: "https://rooftraq.com", target: "_blank", rel: "noopener noreferrer" }
					: { to: "/properties" };
				return (
				<div className="col" key={`properties-${i}`}>
					<div className="col-md">
						<CardLink {...linkProps} style={{ color: "inherit", textDecoration: "none" }}>
							<div
								className={propertiesAsPlaceholder ? "card text-center text-white mb-3 trailing-card-white" : "card text-center text-white mb-3"}
								id={propertiesAsPlaceholder ? "placeholder" : "total-orders"}
								style={{
									height: `${i === 0 && firstPlaceholderHeight != null ? firstPlaceholderHeight : cardHeight}px`,
									overflow: "hidden",
									position: "relative",
								}}
							>
								<div className="card-header">
									<h5 className={propertiesHeadingBlack && !propertiesAsPlaceholder ? "card-title properties-heading-black" : "card-title"}>
										{propertiesAsPlaceholder ? "Placeholder" : "My Properties"}
									</h5>
								</div>
								{!hidePropertiesContent && (
									<div className="card-body" style={{ position: "absolute", bottom: "24px", left: 0, right: 0 }}>
										<h3 className="card-title">{total}</h3>
									</div>
								)}
								{i === 0 && firstPlaceholderImage && (
									<>
										<div
											style={{
												position: "absolute",
												inset: 0,
												backgroundImage: `url('${firstPlaceholderImage}')`,
												backgroundSize: "cover",
												backgroundPosition: "center",
											}}
										/>
										<div
											style={{
												position: "absolute",
												inset: "50% 0 0 0",
												background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
											}}
										/>
										<div
											style={{
												position: "absolute",
												bottom: "24px",
												left: 0,
												right: 0,
												paddingLeft: "24px",
												textAlign: "left",
												color: "#fff",
												fontWeight: "bold",
												fontSize: "1.5rem",
											}}
										>
											Learn More About Rooftraq
										</div>
									</>
								)}
							</div>
						</CardLink>
					</div>
				</div>
				);
			})}
			{showOtherCards && (
				<>
					<div className="col">
						<div className="col-md">
							<Link to="/inspections-pending" style={{ color: "inherit", textDecoration: "none" }}>
								<div className="card text-center text-white mb-3" id="orders-delivered" style={{ height: `${cardHeight}px`, overflow: "hidden", position: "relative" }}>
									<div className="card-header"><h5 className="card-title">Inspections Pending</h5></div>
									<div className="card-body" style={{ position: "absolute", bottom: "24px", left: 0, right: 0 }}>
										<h3 className="card-title">{delivered}</h3>
									</div>
								</div>
							</Link>
						</div>
					</div>
					<div className="col">
						<div className="col-md">
							<Link to="/results" style={{ color: "inherit", textDecoration: "none" }}>
								<div className="card text-center text-white mb-3" id="orders-pending" style={{ height: `${cardHeight}px`, overflow: "hidden", position: "relative" }}>
									<div className="card-header"><h5 className="card-title">Results</h5></div>
									<div className="card-body" style={{ position: "absolute", bottom: "24px", left: 0, right: 0 }}>
										<h3 className="card-title">{pending}</h3>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</>
			)}
			{showProjectsCard && (
				<div className="col">
					<div className="col-md">
						<Link to="/projects" style={{ color: "inherit", textDecoration: "none" }}>
							<div className="card text-center text-white mb-3" id="orders-projects" style={{ height: `${cardHeight}px`, overflow: "hidden", position: "relative" }}>
								<div className="card-header"><h5 className="card-title">Projects</h5></div>
								<div className="card-body" style={{ position: "absolute", bottom: "24px", left: 0, right: 0 }}>
									<h3 className="card-title">{projects}</h3>
								</div>
							</div>
						</Link>
					</div>
				</div>
			)}
			{Array.from({ length: trailingCards }).map((_, i) => (
				<div className="col" key={`trailing-${i}`}>
					<div className="col-md">
						<Link to="/properties" style={{ color: "inherit", textDecoration: "none" }}>
							<div className="card text-center text-white mb-3 trailing-card-white" id="placeholder" style={{ height: `${trailingCardHeight}px`, overflow: "hidden" }}>
								<div className="card-header"><h5 className="card-title">Placeholder</h5></div>
							</div>
						</Link>
					</div>
				</div>
			))}
			{showLearnMoreCard && (
				<div className="col">
					<div className="col-md">
						<a href="https://rooftraq.com" target="_blank" rel="noopener noreferrer" className="learn-more-card">
							<span className="learn-more-card-heading">Learn More About Rooftraq</span>
						</a>
					</div>
				</div>
			)}
		</div>
	);
}
