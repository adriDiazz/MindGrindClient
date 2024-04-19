import "react-tippy/dist/tippy.css";

import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";

import { useSelectedNote } from "../../context/SelectedNoteContext";
import { useUser } from "../../context/UserContext";
import { Note } from "../../types/types";
import ChangeIcon from "../Ui/Icons/ChangeIcon";
import DeleteIcon from "../Ui/Icons/DeleteIcon";
import ModalComponent from "../Ui/ModalComponent";
import ModalChangeTitle from "./ModalChangeTitle";
import ModalDeleteNote from "./ModalDeleteNote";
import styles from "./Note.module.scss";

interface NoteProps {
	note: Note;
}

const NoteElement: FC<NoteProps> = ({ note }) => {
	const navigate = useNavigate();
	const { user } = useUser();
	const { setSelectedNote } = useSelectedNote();
	const [openedChange, setOpenedChange] = useState(false);
	const [openedDelete, setOpenedDelete] = useState(false);
	const [disableEvents, setDisableEvents] = useState(false);
	const fecha = new Date(note.createdAt);
	const dia = fecha.getDate();
	const mes = fecha.getMonth() + 1;
	const año = fecha.getFullYear();
	const title = note.title.length > 17 ? `${note.title.slice(0, 17)}...` : note.title;

	const handlePopperClick = (event: Event) => {
		event.stopPropagation();
		event.preventDefault();
		// Aquí puedes agregar lógica adicional si es necesario
	};

	useEffect(() => {
		const pop = document.querySelector(".tippy-popper");
		if ((pop && openedChange) || (openedDelete && pop)) {
			pop.addEventListener("click", handlePopperClick);
			pop.remove();

			return () => {
				pop.removeEventListener("click", handlePopperClick);
			};
		}
	}, [openedChange, openedDelete]);

	const handleNoteClick = () => {
		if (!disableEvents) {
			setSelectedNote(note);
			navigate(`/notes/${note.noteId}`, {
				state: { data: { data: note }, user },
			});
		}
	};

	const handlChangeClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		setOpenedChange(true);
	};

	const handleDeleteClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		setOpenedDelete(true);
	};

	return (
		<div
			className={styles.wrapper}
			onClick={handleNoteClick}
			style={{
				backgroundImage: `url(${note.previewUrl})`,
			}}
		>
			{/* <img src="MockPreview.png" alt="" /> */}
			{/* <img src={note.previewUrl} alt="" className={styles.preview} /> */}
			<div className={styles.bottom}>
				<span className={styles.title}>{title}</span>

				<div className={styles.titleWrapper}>
					<img src="FileOutlined.png" alt="" />
					<span className={styles.date}>{`${dia}/${mes}/${año}`}</span>
					<Tooltip
						html={
							<div className={styles.tooltip}>
								<div className={styles.change}>
									<ChangeIcon />
									<span onClick={handlChangeClick}>Change Title</span>
								</div>
								<div className={styles.delete}>
									<DeleteIcon />
									<span onClick={handleDeleteClick}>Delete</span>
								</div>
							</div>
						}
						position="bottom"
						trigger="click"
						interactive
						theme="light"
						onRequestClose={() => setDisableEvents(false)}
						onShow={() => setDisableEvents(true)}
					>
						<img
							className={styles.imgOptions}
							src="optionsButton.png"
							alt=""
							onClick={(event) => {
								event.stopPropagation();
								// Aquí puedes poner el código para mostrar el tooltip
							}}
						/>
					</Tooltip>
				</div>
			</div>
			<ModalComponent opened={openedChange} setOpened={setOpenedChange}>
				<ModalChangeTitle note={note} setOpenedChange={setOpenedChange} />
			</ModalComponent>
			<ModalComponent opened={openedDelete} setOpened={setOpenedDelete}>
				<ModalDeleteNote note={note} setOpenedDelete={setOpenedDelete} />
			</ModalComponent>
		</div>
	);
};

export default NoteElement;
