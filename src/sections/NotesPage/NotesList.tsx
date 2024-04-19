/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { FC } from "react";

import { Note } from "../../types/types";
import AddNote from "./AddNote";
import NoteElement from "./Note";
import styles from "./NotesList.module.scss";

interface props {
	notes: Note[];
}

const NotesList: FC<props> = ({ notes }) => {
	return (
		<div className={styles.rightWrapper}>
			<div className={styles.notesWrapper}>
				<AddNote />
				{notes?.map((note) => (
					<NoteElement note={note} key={note.noteId} />
				))}
			</div>
		</div>
	);
};

export default NotesList;
