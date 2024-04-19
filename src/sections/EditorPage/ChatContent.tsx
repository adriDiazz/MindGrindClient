import "react-toastify/dist/ReactToastify.css";

import { FC, KeyboardEvent, useEffect, useRef, useState } from "react"; // Importa useRef
import { toast, ToastContainer } from "react-toastify";

import { useSelectedNote } from "../../context/SelectedNoteContext";
import { useUser } from "../../context/UserContext";
import { getMessages, sendMessageGpt } from "../../services/ChatService";
import BtnLoader from "../Ui/BtnLoader";
import CopyIcon from "../Ui/Icons/CopyIcon";
import CrossIcon from "../Ui/Icons/CrossIcon";
import SendIcon from "../Ui/Icons/SendIcon";
import styles from "./Chat.module.scss";

interface ChatMessageProps {
	setActiveChat: (activeChat: boolean) => void;
	activeChat: boolean;
}
interface Message {
	message: string;
	isSent: boolean;
}

const ChatMessage: FC<ChatMessageProps> = ({ setActiveChat }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user } = useUser();
	const { selectedNote } = useSelectedNote();
	const messagesEndRef = useRef<null | HTMLDivElement>(null); // Ref para el scroll

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 200);

		return () => clearTimeout(timer);
	}, []);
	const notify = () => toast("Copied to clipboard!");

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await getMessages(user?.userId, selectedNote?.noteId);
				console.log("response", response);
				setMessages(response.chat);
			} catch (error) {
				console.error("Failed to fetch messages:", error);
			}
		};

		void fetchMessages();
	}, [selectedNote, user]);

	useEffect(() => {
		// Función para hacer scroll al último mensaje
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]); // Dependencia: messages

	const handleSendMessage = async () => {
		if (!inputValue.trim()) {
			return;
		}
		setLoading(true);
		const sentMessage = { message: inputValue, isSent: true };
		setMessages((prevMessages) => [...prevMessages, sentMessage]);

		try {
			const response = (await sendMessageGpt(sentMessage, user?.userId, selectedNote?.noteId)) as {
				message: string;
				isSent: boolean;
			};
			setMessages((prevMessages) => [
				...prevMessages,
				{ message: response.chat.message, isSent: response.chat.isSent },
			]);
		} catch (error) {
			console.error("Failed to send message:", error);
		} finally {
			setInputValue("");
			setLoading(false);
		}
	};

	const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			await handleSendMessage();
		}
	};

	const handleCopy = async (message) => {
		try {
			await navigator.clipboard.writeText(message);
			notify();
		} catch (err) {
			console.error("Failed to copy: ", err);
			notify();
		}
	};

	return (
		<div className={`${styles.chatWrapper} ${isVisible ? styles.visible : ""}`}>
			<div className={styles.chatHeader}>
				<h2>GPT Chat</h2>
				<button onClick={() => setActiveChat(false)}>
					<CrossIcon />
				</button>
			</div>
			<div className={styles.chatContent}>
				{messages.map((message, index) => (
					<div key={index} className={message.isSent ? styles.sentMessage : styles.receivedMessage}>
						{message.message}
						{!message.isSent && (
							<div onClick={() => void handleCopy(message.message)} className={styles.copyButton}>
								<CopyIcon />
							</div>
						)}
						<ToastContainer
							position="top-right"
							autoClose={1000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							theme="light"
						/>
					</div>
				))}
				{/* Elemento al final del contenedor para hacer scroll */}
				<div ref={messagesEndRef} />
			</div>
			<div className={styles.footerWrapper}>
				{loading && <BtnLoader />}
				<div className={styles.chatFooter}>
					<textarea
						placeholder="Type a message"
						value={inputValue}
						className={inputValue ? "focused" : ""}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) => void handleKeyDown(e)}
						onFocus={(e) => e.target.classList.add("focused")}
						onBlur={(e) => !e.target.value && e.target.classList.remove("focused")}
					/>
					<button onClick={() => void handleSendMessage()}>
						<SendIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatMessage;
