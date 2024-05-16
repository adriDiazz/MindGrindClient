/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from "react";

import { useNotes } from "../../context/NoteContext";
import { useUser } from "../../context/UserContext";
import { deleteNote } from "../../services/NotesService";
import { Note } from "../../types/types";
import Button from "../Ui/Button";
import styles from "./ModalChangeTitle.module.scss";

interface ModalDeleteTitleProps {
	note: Note;
	setOpenedDelete: (value: boolean) => void;
}

const ModalDeleteNote: FC<ModalDeleteTitleProps> = ({ note, setOpenedDelete }) => {
	const { user } = useUser();
	const { reloadNotes } = useNotes();

	const handleDelete = async () => {
		const response = await deleteNote(user?.userId, note.noteId);
		if (response) {
			setOpenedDelete(false);
			await reloadNotes();
		}
	};

	return (
		<div className={styles.wrapper}>
			<h1>Delete Note?</h1>
			<div className={styles.btnWrapper}>
				<Button
					isWhite
					onClick={() => {
						setOpenedDelete(false);
					}}
				>
					Cancel
				</Button>
				<Button onClick={handleDelete}>Delete</Button>
			</div>
		</div>
	);
};

export default ModalDeleteNote;
