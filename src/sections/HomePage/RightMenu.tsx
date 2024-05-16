import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

import { userType } from "../../context/UserContext";
import ArrowIcon from "../Ui/Icons/ArrowIcon";
import ExamIcon from "../Ui/Icons/ExamIcon";
import HomeIcon from "../Ui/Icons/HomeIcon";
import NotesIcon from "../Ui/Icons/NotesIcon";
import styles from "./HomePage.module.scss";

interface User {
	user: userType | null;
}

const LeftMenu: FC<User> = ({ user }) => {
	const navigate = useNavigate();
	const { signOut } = useUser();
	const [collapse, setCollapse] = useState(false);

	return (
		<div className={styles.rightMenuWrapper}>
			<div className={styles.profileWrapper}>
				<img src="/profile.png" alt="defaultProfileImage" />
				<span>{user?.username}</span>
			</div>

			{/* <div className={styles.lineSeparator}></div> */}

			<div className={styles.sectionsWrapper}>
				<div
					className={styles.section}
					onClick={() => {
						navigate("/home");
					}}
				>
					<div className={styles.left}>
						<HomeIcon />
						{!collapse && <span>Home</span>}
					</div>
					{!collapse && <ArrowIcon />}
				</div>
				<div
					className={styles.section}
					onClick={() => {
						navigate("/notes");
					}}
				>
					<div className={styles.left}>
						<NotesIcon />
						{!collapse && <span>Notes</span>}
					</div>
					{!collapse && <ArrowIcon />}
				</div>
				<div
					className={styles.section}
					onClick={() => {
						navigate("/exams");
					}}
				>
					<div className={styles.left}>
						<ExamIcon />
						{!collapse && <span>Learning</span>}
					</div>
					{!collapse && <ArrowIcon />}
			 	</div>
			</div>
			<div className={styles.moreMin}>
				<span>More minutes?</span>
				<img src="/starY.png" alt="" />
			</div>
			<button className={styles.btn} onClick={() => signOut()}>Log Out</button>
			<div className={styles.collapseBtn} onClick={() => setCollapse(!collapse)}>
				<ArrowIcon />
				{!collapse && <span>Collapse Sidebar</span>}
			</div>
		</div>
	);
};

export default LeftMenu;
