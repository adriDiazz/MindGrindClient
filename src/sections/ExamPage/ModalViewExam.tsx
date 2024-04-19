import styles from "./ModalViewExam.module.scss";

const ModalViewExam = ({ examInfo }) => {
	console.log(examInfo.content);
	const questions = JSON.parse(examInfo.content).questions;

	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<h2>{examInfo.title}</h2>
				<p>Score: {examInfo.score}</p>
			</div>
			{questions?.map((question, index) => {
				return (
					<div key={index} className={styles.qWrapper}>
						<h5>{question.question}</h5>
						<p>{question.answer}</p>
					</div>
				);
			})}
		</div>
	);
};

export default ModalViewExam;
