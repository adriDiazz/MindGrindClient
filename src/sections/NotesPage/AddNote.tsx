import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import { createNote } from "../../services/NotesService";
import AddIcon from "../Ui/Icons/AddIcon";
import Loader from "../Ui/Loader";
import ModalComponent from "../Ui/ModalComponent";
import styles from "./Note.module.scss";

function AddNote() {
	const [open, setOpen] = useState(false);
	const { user } = useUser();
	const navigate = useNavigate();

	const handleAddNote = async () => {
		setOpen(true);
		const data = await createNote({
			data: { chatGptNotes: "" },
			user,
		});
		const userData = data.data;

		const note = userData.notes?.find((note) => note.noteId === data.noteId);
		console.log("note", note);
		navigate(`/notes/${note.noteId}`, {
			state: { data: { data: note }, user },
		});
	};

	return (
		<div className={styles.wrapperAddNote} onClick={() => void handleAddNote()}>
			{/* <img src="addIcon.png" alt="" /> */}
			<AddIcon />
			<ModalComponent opened={open} setOpened={setOpen}>
				<div>
					<Loader />
				</div>
			</ModalComponent>
		</div>
	);
}

export default AddNote;
