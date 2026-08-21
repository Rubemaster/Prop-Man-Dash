function emailUrl() {
	window.location.href = `mailto:?subject=${encodeURIComponent("Rooftraq Dashboard")}&body=${encodeURIComponent(window.location.href)}`;
}

export default function MobileNotice() {
	return (
		<div className="mobile-notice">
			<span>Rooftraq Dashboard works better on a big screen</span>
			<button type="button" style={{ all: "revert" }} onClick={emailUrl}>
				E-Mail URL
			</button>
		</div>
	);
}
