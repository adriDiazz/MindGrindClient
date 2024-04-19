/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useState } from "react";

import { useNotes } from "../../context/NoteContext";
import { useUser } from "../../context/UserContext";
import { updateNote } from "../../services/NotesService";
import { Note } from "../../types/types";
import Button from "../Ui/Button";
import styles from "./ModalChangeTitle.module.scss";

interface ModalChangeTitleProps {
	note: Note;
	setOpenedChange: (value: boolean) => void;
}

const ModalChangeTitle: FC<ModalChangeTitleProps> = ({ note, setOpenedChange }) => {
	const { user } = useUser();
	const { reloadNotes } = useNotes();
	const [title, setTitle] = useState("");

	const handelSave = async () => {
		const newNote = { ...note };
		newNote.title = title;
		const response = await updateNote(user?.userId, newNote);
		if (response) {
			setOpenedChange(false);
			await reloadNotes();
		}
	};

	return (
		<div className={styles.wrapper}>
			<h1>Change Title</h1>
			<input
				type="text"
				placeholder="Enter new title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<div className={styles.btnWrapper}>
				<Button
					isWhite
					onClick={() => {
						setOpenedChange(false);
					}}
				>
					Cancel
				</Button>
				<Button onClick={handelSave}>Save</Button>
			</div>
		</div>
	);
};

export default ModalChangeTitle;
