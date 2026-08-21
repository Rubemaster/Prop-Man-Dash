function copyUrl() {
	navigator.clipboard.writeText(window.location.href);
}

export default function MobileNotice() {
	return (
		<div className="mobile-notice">
			<span>Rooftraq Dashboard works better on a big screen</span>
			<button type="button" style={{ all: "revert" }} onClick={copyUrl}>
				Copy URL
			</button>
		</div>
	);
}
