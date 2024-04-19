/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNotes } from "../../context/NoteContext";
import { useUser } from "../../context/UserContext";
import { createExam } from "../../services/ExamService";
import { Exam } from "../../types/types";
import Button from "../Ui/Button";
import Loader from "../Ui/Loader";
import styles from "./ModalCreateExam.module.scss";

const ModalCreateExam = () => {
	const { notes } = useNotes();
	const { user } = useUser();
	const navigate = useNavigate();
	const [selectedNote, setSelectedNote] = useState("");
	const [loading, setLoading] = useState(false);

	const currentNote = notes.find((note) => note.noteId === selectedNote);

	const handleCreateExam = async () => {
		setLoading(true);
		const created = (await createExam(user?.userId, currentNote?.note, selectedNote)) as
			| {
					exam: {
						exam: Exam;
					};
			  }
			| undefined;
		setLoading(false);
		if (created?.exam) {
			navigate(`/exams/${created.exam.exam.examId}`, {
				state: { exam: created.exam.exam },
			});
		} else {
			alert("Error creating exam");
		}
	};

	return (
		<div className={styles.wrapper}>
			<h1>Select note</h1>
			{loading ? (
				<Loader />
			) : (
				<select
					name=""
					id=""
					value={selectedNote}
					onChange={(event) => setSelectedNote(event.target.value)}
				>
					<option value="" disabled={!selectedNote}>
						Select note...
					</option>
					{notes.map((note) => (
						<option key={note.noteId} value={note.noteId}>
							{note.title}
						</option>
					))}
				</select>
			)}

			<div className={styles.btnWrapper}>
				<Button isWhite>Cancel</Button>
				<Button onClick={handleCreateExam}>Create</Button>
			</div>
		</div>
	);
};

export default ModalCreateExam;
