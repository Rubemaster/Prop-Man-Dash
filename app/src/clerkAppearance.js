export const clerkAppearance = {
	variables: {
		colorPrimary: "#52525b",
		colorText: "#27272a",
		colorBackground: "#ffffff",
		borderRadius: "0.375rem",
		fontFamily: "system-ui, -apple-system, sans-serif",
	},
	elements: {
		rootBox: { width: "100%", display: "flex", justifyContent: "center", background: "transparent" },
		card: {
			boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.08)",
			border: "1px solid #e4e4e7",
		},
		headerTitle: { fontWeight: 700, color: "#27272a" },
		formButtonPrimary: {
			backgroundColor: "#52525b",
			textTransform: "none",
			fontSize: "1rem",
			"&:hover": { backgroundColor: "#3f3f46" },
			"&:focus": { boxShadow: "none" },
		},
		footerActionLink: { color: "#52525b" },
	},
};
