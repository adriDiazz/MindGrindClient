import { useNavigate } from "react-router-dom";

import { useNotes } from "../../context/NoteContext";
import { useUser } from "../../context/UserContext";
import styles from "../HomePage/HomePage.module.scss";
import LeftMenu from "../HomePage/RightMenu";
import Loader from "../Ui/Loader";
import NotesList from "./NotesList";

const NotesPage = () => {
	const { user } = useUser();
	const { notes, loading } = useNotes();
	const navigate = useNavigate();

	if (!user) {
		navigate("/");
	}

	return (
		<div className={styles.wrapper}>
			<LeftMenu user={user} />
			{!loading ? <NotesList notes={notes} /> : <Loader />}
		</div>
	);
};

export default NotesPage;
