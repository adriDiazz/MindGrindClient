import { FC } from "react";
import Modal from "react-modal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "16px",
		padding: "0",
		border: "none",
	},
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 1000,
	},
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
Modal.setAppElement("#root");

interface ModalComponentProps {
	opened: boolean;
	setOpened: (opened: boolean) => void;
	children: React.ReactNode;
}

const ModalComponent: FC<ModalComponentProps> = ({ opened, setOpened, children }) => {
	return (
		<div>
			<Modal
				isOpen={opened}
				onRequestClose={() => setOpened(false)}
				style={customStyles}
				contentLabel="Example Modal"
			>
				{children}
			</Modal>
		</div>
	);
};

export default ModalComponent;
