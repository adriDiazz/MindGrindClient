import { FC } from "react";

import ChatButton from "./ChatButton";
import ChatMessage from "./ChatContent";

interface ChatProps {
	activeChat: boolean;
	setActiveChat: (activeChat: boolean) => void;
}

const Chat: FC<ChatProps> = ({ activeChat, setActiveChat }) => {
	return (
		<>
			{activeChat && <ChatMessage setActiveChat={setActiveChat} activeChat={activeChat} />}
			<ChatButton setActiveChat={setActiveChat} />
		</>
	);
};

export default Chat;
