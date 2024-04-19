export const sendMessageGpt = async (
	message: {
		message: string;
		isSent: boolean;
	},
	userId: string,
	noteId: string
) => {
	try {
		const messageBody = {
			message,
			userId,
			noteId,
		};
		const response = await fetch(`${String(import.meta.env.VITE_API_CHAT)}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: messageBody.message,
				userId: messageBody.userId,
				noteId: messageBody.noteId,
			}),
		});
		const data = await response.json();

		return data;
	} catch (error) {
		// Handle the error here
		console.error("An error occurred:", error);
		throw error;
	}
};

export const getMessages = async (userId: string | undefined, noteId: string | undefined) => {
	try {
		const message = {
			userId,
			noteId,
		};
		const response = await fetch(`${String(import.meta.env.VITE_API_CHAT)}/${userId}/${noteId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		
		const data = await response.json();
	console.log("response", data);
		return data;
	} catch (error) {
		// Handle the error here
		console.error("An error occurred:", error);
		throw error;
	}
};
