import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput } from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

export default function SupportChat() {
	const { user } = useUser();
	const [open, setOpen] = useState(false);
	const [client, setClient] = useState(null);
	const [channel, setChannel] = useState(null);
	const clientRef = useRef(null);

	useEffect(() => {
		if (!open || !user?.id || clientRef.current) return;
		let cancelled = false;

		(async () => {
			const res = await fetch("/api/stream-token", { cache: "no-store" });
			const { token, apiKey } = await res.json();

			const chatClient = StreamChat.getInstance(apiKey);
			await chatClient.connectUser(
				{ id: user.id, name: user.fullName || user.username || user.id },
				token
			);
			if (cancelled) return;

			// Stable channel per user -- messaging channels auto-create a member
			// user stub for "support" the first time it's referenced.
			const supportChannel = chatClient.channel("messaging", `support-${user.id}`, {
				members: [user.id, "support"],
				name: "Business Support",
			});
			await supportChannel.watch();
			if (cancelled) return;

			clientRef.current = chatClient;
			setClient(chatClient);
			setChannel(supportChannel);
		})();

		return () => {
			cancelled = true;
		};
	}, [open, user?.id]);

	useEffect(() => {
		return () => {
			clientRef.current?.disconnectUser();
		};
	}, []);

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				style={{
					position: "fixed",
					bottom: "20px",
					right: "20px",
					zIndex: 1000,
					backgroundColor: "#6c47ff",
					color: "#fff",
					border: "none",
					padding: "12px 20px",
					fontWeight: "bold",
					cursor: "pointer",
				}}
			>
				{open ? "Close Support" : "Support Chat"}
			</button>
			{open && (
				<div
					style={{
						position: "fixed",
						bottom: "70px",
						right: "20px",
						width: "360px",
						height: "500px",
						zIndex: 1000,
						boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
						background: "#fff",
					}}
				>
					{client && channel ? (
						<Chat client={client}>
							<Channel channel={channel}>
								<Window>
									<ChannelHeader title="Business Support" />
									<MessageList />
									<MessageInput />
								</Window>
							</Channel>
						</Chat>
					) : (
						<div style={{ padding: "16px" }}>Connecting...</div>
					)}
				</div>
			)}
		</>
	);
}
