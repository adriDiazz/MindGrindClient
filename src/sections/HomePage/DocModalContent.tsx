import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import { createNote, sendPdf } from "../../services/NotesService";
import Button from "../Ui/Button";
import ModalComponent from "../Ui/ModalComponent";
import styles from "./DocModal.module.scss";
import { useState } from "react";
import Loader from "../Ui/Loader";

export interface DocModalContentProps {
	files: File[];
	imageSrc: string;
	setSelectingDirectory: (c: boolean) => void;
	fileName: string;
	setFilename: (s: string) => void;
}

const DocModalContent: React.FC<DocModalContentProps> = ({
	files,
	imageSrc,
	fileName,
	setFilename,
}) => {
	const navigate = useNavigate();
	const { user } = useUser();
	const [loading, setLoading] = useState(false);

	const handleUpload = async () => {
		setLoading(true);
		const chatGptNotes = await sendPdf(files[0]);
		const noteContent = chatGptNotes.chatGptNotes;
		console.log(noteContent);
		const createdNote = await createNote({
			data: { chatGptNotes: noteContent },
			user,
		});
		setLoading(false);
		const userData = createdNote.data;

		const note = userData.notes?.find((note) => note.noteId === createdNote.noteId);
		navigate(`/notes/${note.noteId}`, {
			state: { data: { data: note }, user },
		});
	};

	return (
		<>
			<h2>Preview Your File</h2>
			{files[0].type.startsWith("application/pdf") && (
				<div className={styles.iframeWrapper}>
					<iframe src={imageSrc} width="90%" height="500px" title="PDF Viewer"></iframe>
				</div>
			)}

			<div className={styles.btnWrapper}>
				<input
					type="text"
					placeholder={files[0].name}
					value={fileName}
					onChange={(e) => {
						setFilename(e.target.value);
					}}
				/>
				<Button
					onClick={() => {
						void handleUpload();
					}}
				>
					Upload
				</Button>
				<ModalComponent opened={loading} setOpened={setLoading}>
					<Loader />
				</ModalComponent>
			</div>
		</>
	);
};

export default DocModalContent;
