import { userType } from "../context/UserContext";
import { ResponseApi } from "../sections/HomePage/HomePage";

export interface Note {
	note: string;
	noteId: string;
	isDirectory: boolean;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	category: string;
	previewUrl: string;
}

export interface NoteResponse {
	noteId: string;
	data: {
		userId: string;
		notes: Note[];
		createdAt: Date;
		updatedAt: Date;
	};
}

export interface CreateNoteType {
	data: ResponseApi | undefined;
	user: userType | null;
}

export interface Question {
	question: string;
	options: string[];
	answer: string;
}

export interface Exam {
	exam: {
		role: string;
		content: {
			questions: Question[];
		};
		score: number;
		noteId: string;
		examId: string;
	};
}
