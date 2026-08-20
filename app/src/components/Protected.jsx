import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Protected({ children }) {
	const { isLoaded, isSignedIn } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoaded && !isSignedIn) navigate("/");
	}, [isLoaded, isSignedIn, navigate]);

	if (!isLoaded || !isSignedIn) return null;
	return children;
}
