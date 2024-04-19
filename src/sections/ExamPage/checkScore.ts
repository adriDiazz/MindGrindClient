export const checkScore = (examAnswers, exam) => {
	let score = 0;
	exam.questions.forEach((question, index) => {
        console.log(examAnswers[index]?.answer, question.answer);
		if (examAnswers[index]?.answer === question.answer) {
			score += 1;
		}
	});

	return score;
};
