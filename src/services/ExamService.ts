import { Exam } from "../types/types";

export const getExams = async (userId: string) => {
	try {
		const response = await fetch(`${String(import.meta.env.VITE_API_EXAM)}${userId}`);
		const data = await response.json();

		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}
};

export const createExam = async (userId: string | undefined, note: string | undefined, noteId: string) => {
	try {
		const response = await fetch(`${String(import.meta.env.VITE_API_EXAM)}${userId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ note, noteId }),
		});
		const data = await response.json();

		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}
};

export const updateExam = async (userId: string, exam: Exam ) => {
	try {
		const response = await fetch(`${String(import.meta.env.VITE_API_EXAM)}update/${userId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(exam),
		});
		const data = await response.json();

		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}
};
