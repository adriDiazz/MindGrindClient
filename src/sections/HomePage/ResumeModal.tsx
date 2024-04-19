import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelectedNote } from "../../context/SelectedNoteContext";
import { useUser } from "../../context/UserContext";
import { createNote } from "../../services/NotesService";
import { Note, NoteResponse } from "../../types/types";
import Loader from "../Ui/Loader";
import { ResponseApi } from "./HomePage";
import style from "./ResumeModal.module.scss";
import { useNotes } from "../../context/NoteContext";

interface ResumeModalProps {
	loading: boolean;
	data: ResponseApi | undefined;
	videoId: string;
	setLoading: (loading: boolean) => void;
}

const ResumeModal: FC<ResumeModalProps> = ({ loading, videoId, data, setLoading }) => {
	const notesShort = data?.chatGptNotes.slice(0, 2000);
	const navigate = useNavigate();
	const { user } = useUser();
	const { reloadNotes } = useNotes();
	const { setSelectedNote } = useSelectedNote();
	const [response, setResponse] = useState<NoteResponse>();

	const handleCreateButton = () => {
		createNote({
			data,
			user,
		})
			.then((response) => {
				const currentNote = response.data?.notes?.find((note) => note.noteId === response.noteId);
				setSelectedNote(currentNote as Note);
				void reloadNotes();
				navigate("/editor", {
					state: {
						data: {
							data: currentNote,
							noteId: response.noteId,
						},
						user,
					},
				});
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.log(error);
			});
	};

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<div className={style.wrapper}>
					<div className={style.videoWrapper}>
						<iframe
							width="560"
							height="315"
							src={`https://www.youtube.com/embed/${videoId}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						></iframe>
					</div>
					<div className={style.noteWrapper}>
						<h2>Resume</h2>
						<p>{notesShort}.....</p>
						<div className={style.btnWrapper}>
							<button
								className={style.btnCreate}
								onClick={() => {
									handleCreateButton();
								}}
							>
								Create Notes
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ResumeModal;
