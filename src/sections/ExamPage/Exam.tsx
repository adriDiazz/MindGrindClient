import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import { updateExam } from "../../services/ExamService";
import { Exam } from "../../types/types";
import Button from "../Ui/Button";
import ModalComponent from "../Ui/ModalComponent";
import { checkScore } from "./checkScore";
import styles from "./ExamPage.module.scss";
import ExamQuestion from "./ExamQuestion";

function ExamComponent() {
	const { state } = useLocation();
	const { user } = useUser();
	const navigate = useNavigate();
	const exams = JSON.parse(state?.exam.content) as Exam;
	const [examAnswers, setExamAnswers] = useState([]);
	const [submited, setSubmited] = useState(false);

	const handleSubmit = async () => {
		const score = checkScore(examAnswers, exams);
		const newExam = { ...state.exam, score };
		state.exam = newExam;
		const update = await updateExam(user?.userId, state);
		setSubmited(true);
		//const update = await updateExam(state, user?.userId);
	};

	return (
		<div className={styles.leftWrapper}>
			<div className={styles.examTopBar}>
				<h2>{state.exam.title}</h2>
				<p>Answered Questions: {examAnswers.length}</p>
				<Button extraStyles={{ padding: "0.5rem 1rem" }} onClick={handleSubmit}>
					Submit
				</Button>
			</div>
			{exams.questions.map((question, index) => (
				<ExamQuestion
					key={index}
					question={question}
					index={index}
					setExamAnswers={setExamAnswers}
					examAnswers={examAnswers}
				/>
			))}
			<ModalComponent opened={submited} setOpened={setSubmited}>
				<div className={styles.modalWrapper} style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: "2rem",
					fontFamily: "MazzardR",
				}}>
					<h2>Exam Submitted</h2>
					<p>Your score is: {state.exam.score}</p>
					<Button
						extraStyles={{ padding: "0.5rem 1rem" }}
						onClick={() => {
							navigate("/home");
						}}
					>
						Close
					</Button>
				</div>
			</ModalComponent>
		</div>
	);
}

export default ExamComponent;
