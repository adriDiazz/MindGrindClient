/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { CreateNoteType, Note, NoteResponse } from "../types/types";

export const createNote = (note: CreateNoteType): Promise<void | NoteResponse> => {
	return fetch(`${String(import.meta.env.VITE_API_SAVE)}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			note: note.data?.chatGptNotes,
			userId: note.user?.userId,
		}),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => {
			return data as NoteResponse;
		})
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log(error);
		});
};

export const getLastModifiedNotes = async (userId: string): Promise<Note[]> => {
	try {
		const lastNotes = await fetch(`${String(import.meta.env.VITE_API_LAST_NOTES)}/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = (await lastNotes.json()) as Note[];

		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		throw error;
	}
};

export const updateNote = (userId: string | undefined, note: Note): Promise<unknown> => {
	try {
		return fetch(`${String(import.meta.env.VITE_API_UPDATE)}${userId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ note }),
		}).then(() => {
			// if (res.ok) {
			// 	return res.json();
			// }
			// throw new Error("Error");
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		throw error;
	}
};

export const deleteNote = (userId: string | undefined, noteId: string): Promise<unknown> => {
	try {
		return fetch(`${String(import.meta.env.VITE_API_DELETE)}userId=${userId}&noteId=${noteId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error("Error");
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		throw error;
	}
};

export const sendPdf = (pdf: string): Promise<any> | undefined => {
	try {
		const blob = new Blob([pdf], { type: "application/pdf" });

		const formData = new FormData();
		formData.append("pdf", blob, "note.pdf");

		return fetch(`${String(import.meta.env.VITE_API_PDF)}`, {
			method: "POST",
			body: formData,
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error("Error");
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}
};

export async function downloadPdf(htmlContent: string): Promise<void> {
	// La función se mantiene mayormente igual, pero asegúrate de cambiar la propiedad en el cuerpo de la solicitud a 'html'
	try {
		const response = await fetch(`${String(import.meta.env.VITE_DOWNLOAD_PDF)}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ markdown: htmlContent }),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok.");
		}

		const blob = await response.blob();
		const downloadUrl = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = downloadUrl;
		link.setAttribute("download", "file.pdf"); // or any other name you want
		document.body.appendChild(link);
		link.click();
		link.parentNode?.removeChild(link);
	} catch (error) {
		console.error("Error downloading the PDF:", error);
	}
}
