import { FC } from "react";

import { Question } from "../../types/types";
import styles from "./ExamPage.module.scss";

interface ExamQuestionProps {
	question: Question;
	index: number;
	setExamAnswers: (value: React.SetStateAction<string[]>) => void;
	examAnswers: string[];
}

const ExamQuestion: FC<ExamQuestionProps> = ({ question, index, setExamAnswers, examAnswers }) => {
	return (
		<div className={styles.examCard}>
			<div className={styles.title}>
				<h2 style={{ margin: "0" }}>{index + 1}-</h2>
				<h3>{question.question}</h3>
			</div>
			<div className={styles.options}>
				{question.options.map((option, optionIndex) => (
					<div key={optionIndex} className={styles.option}>
						<label htmlFor={`option-${index}-${optionIndex}`}>
							<input
								type="radio"
								name={`question-${index}-option`}
								id={`option-${index}-${optionIndex}`}
								value={option}
								onChange={(e) =>
									setExamAnswers((prev) => {
										const existingIndex = prev.findIndex((item) => item.id === index);
										if (existingIndex >= 0) {
											// Si existe una respuesta anterior para esta pregunta, actualízala
											const updatedAnswers = [...prev];
											updatedAnswers[existingIndex] = {
												id: index,
												answer: e.target.value,
											};

											return updatedAnswers;
										}

										return [...prev, { id: index, answer: e.target.value }];
									})
								}
							/>
							{option}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default ExamQuestion;
