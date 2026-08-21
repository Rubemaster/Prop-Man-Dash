import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput } from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { apiFetch } from "../apiClient";

export default function SupportChat() {
	const { user } = useUser();
	const [open, setOpen] = useState(false);
	const [client, setClient] = useState(null);
	const [channel, setChannel] = useState(null);
	const [unreadCount, setUnreadCount] = useState(0);
	const clientRef = useRef(null);

	// Connect as soon as the user is known (not just on open) so the unread
	// badge is live even while the panel is collapsed.
	useEffect(() => {
		if (!user?.id || clientRef.current) return;
		// Set synchronously, before the first await -- React StrictMode
		// double-invokes this effect back-to-back in dev, and both
		// invocations would otherwise race past this guard before either
		// finishes, firing connectUser twice (this is what caused the
		// "Consecutive calls to connectUser" warning).
		clientRef.current = "connecting";
		let cancelled = false;

		(async () => {
			const res = await apiFetch("/api/stream-token", { cache: "no-store" });
			const { token, apiKey } = await res.json();

			const chatClient = StreamChat.getInstance(apiKey);
			await chatClient.connectUser(
				{ id: user.id, name: user.fullName || user.username || user.id },
				token
			);
			if (cancelled) return;

			// Matches the existing iOS app's StreamChatManager.swift exactly:
			// same channel id scheme and the same real "support-team" Stream
			// user (already created in this Stream app -- a plain "support"
			// id doesn't exist and Stream rejects unknown member ids outright).
			// connectUser already makes the current user a channel member
			// implicitly, so only the support side needs listing.
			const supportChannel = chatClient.channel("messaging", `support-${user.id}`, {
				members: ["support-team"],
				name: user.primaryEmailAddress?.emailAddress || user.fullName || user.id,
			});
			await supportChannel.watch();
			if (cancelled) return;

			// total_unread_count is Stream's own tracked value on the connected
			// user, kept live via events -- no need to compute it ourselves.
			setUnreadCount(chatClient.user?.total_unread_count || 0);
			chatClient.on((event) => {
				if (typeof event.total_unread_count === "number") {
					setUnreadCount(event.total_unread_count);
				}
			});

			clientRef.current = chatClient;
			setClient(chatClient);
			setChannel(supportChannel);
		})();

		return () => {
			cancelled = true;
		};
	}, [user?.id]);

	useEffect(() => {
		return () => {
			if (clientRef.current && clientRef.current !== "connecting") {
				clientRef.current.disconnectUser();
			}
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
					backgroundColor: "#6b7280",
					color: "#fff",
					border: "none",
					borderRadius: "999px",
					padding: "12px 20px",
					fontWeight: "bold",
					cursor: "pointer",
					boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
				}}
			>
				{open ? "Close Support" : "Support Chat"}
				{unreadCount > 0 && (
					<span
						style={{
							marginLeft: "8px",
							backgroundColor: "#e5484d",
							color: "#fff",
							borderRadius: "999px",
							padding: "1px 7px",
							fontSize: "12px",
						}}
					>
						{unreadCount}
					</span>
				)}
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
