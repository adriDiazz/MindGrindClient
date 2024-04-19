import { useState } from "react";

import { useUser } from "../../context/UserContext";
import styles from "../HomePage/HomePage.module.scss";
import LeftMenu from "../HomePage/RightMenu";
import ModalComponent from "../Ui/ModalComponent";
import ExamListPage from "./ExamList";
import ModalCreateExam from "./ModalCreateExam";

const ExamPage = () => {
	const { user } = useUser();
	const [opened, setOpened] = useState(false);

	return (
		<div className={styles.wrapper}>
			<LeftMenu user={user} />
			<ExamListPage setOpened={setOpened} />

			<ModalComponent opened={opened} setOpened={setOpened}>
				<ModalCreateExam />
			</ModalComponent>
		</div>
	);
};

export default ExamPage;
