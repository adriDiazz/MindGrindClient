import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React, { useEffect, useState } from "react";

import { useUser } from "../../context/UserContext";
import { getExams } from "../../services/ExamService";
import Button from "../Ui/Button";
import ArrowCollapseIcon from "../Ui/Icons/ArrowCollapseIcon";
import styles from "./ExamPage.module.scss";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../Ui/ModalComponent";
import ModalViewExam from "./ModalViewExam";

interface ExamListPageProps {
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function ExamListPage({ setOpened }: ExamListPageProps) {
	// Estado para controlar la visibilidad de cada examCardItem
	const [collapsed, setCollapsed] = useState({});
	const [exams, setExams] = useState([]);
	const [opener, setOpener] = useState(false);
	const [viewExamClicked, setViewExamClicked] = useState();
	const { user } = useUser();
	const navigate = useNavigate();

	const toggleCollapse = (id: string, event) => {
		// Cambia el estado de colapsado para el id específico
		event.stopPropagation();
		setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	useEffect(() => {
		getExams(user?.userId).then((exams) => {
			setExams(exams);
		});
	}, [user]);

	return (
		<div className={styles.leftWrapperList}>
			<div className={styles.topTitle}>
				<h1>My exams</h1>
				<Button
					extraStyles={{
						padding: "1rem 2.4rem",
					}}
					onClick={() => setOpened(true)}
				>
					Create
				</Button>
			</div>

			<ModalComponent setOpened={setOpener} opened={opener}>
				<ModalViewExam examInfo={viewExamClicked} />
			</ModalComponent>

			<div className={styles.examWrapper} style={{ width: "100%" }}>
				{
					// Si no hay exámenes, muestra un mensaje
					!exams.exams?.length && <p>No exams created yet</p>
				}
				{exams.exams?.map((examItem) => (
					<div
						key={examItem.exam.examId}
						className={styles.examCardItem}
						onClick={() => toggleCollapse(examItem.exam.examId)}
					>
						<div className={styles.examCardItemTop}>
							<h3>{examItem.exam.title}</h3>
							<ArrowCollapseIcon
								onClick={(event) => {
									event.stopPropagation();
									toggleCollapse(examItem.exam.examId, event);
								}}
								style={{
									transform: collapsed[examItem.exam.examId] ? "rotate(180deg)" : "rotate(0deg)",
									transition: "transform 0.3s ease",
								}}
							/>
						</div>
						{/* Contenido que será colapsable */}
						<div
							style={{
								display: !collapsed[examItem.exam.examId] ? "none" : "flex",
							}}
							className={styles.uncollapsed}
						>
							<Gauge
								value={examItem.exam.score}
								startAngle={-110}
								endAngle={110}
								width={100}
								height={100}
								valueMax={10}
								sx={{
									flexGrow: 0,
									WebkitFlexGrow: 0,
									[`& .${gaugeClasses.valueText}`]: {
										fontSize: 14,
										transform: "translate(0px, 0px)",
									},
									[`& .${gaugeClasses.valueArc}`]: {
										fill: "#5552ff",
									},
									[`& .${gaugeClasses.root}`]: {
										flexGrow: 0,
										WebkitFlexGrow: 0,
									},
								}}
								text={({ value, valueMax }) => `${value} / ${valueMax}`}
							/>
							<div className={styles.examCardItemBottom}>
								<div className="">
									<p>Questions: 10</p>
									<p style={{ marginBottom: 0 }}>Duration: 20 min</p>
								</div>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "1rem",
									}}
								>
									<Button
										isWhite
										extraStyles={{
											padding: "0.5rem 0.5rem",
										}}
									>
										Delete exam
									</Button>
									<Button
										isWhite
										extraStyles={{
											padding: "0.5rem 0.5rem",
										}}
										onClick={() => {
											navigate(`/exams/${examItem.exam.examId}`, {
												state: { exam: examItem.exam },
											});
										}}
									>
										Repeat exam
									</Button>
									<Button
										extraStyles={{
											padding: "0.5rem 0.5rem",
										}}
										onClick={() => {
											setOpener(true);
											setViewExamClicked(examItem.exam);
										}}
									>
										View exam
									</Button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ExamListPage;
