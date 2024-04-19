/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Note, NoteResponse } from "../types/types";
import { useUser } from "./UserContext";

// Definimos el contexto
const NotesContext = createContext(
	{} as { notes: Note[]; loading: boolean; reloadNotes: () => Promise<void> }
);

// Proveedor del contexto
export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { user } = useUser();

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				if (!user) {
					navigate("/");
				} else {
					const response = await fetch(`${String(import.meta.env.VITE_API_NOTES)}${user.userId}`);
					if (!response.ok) {
						throw new Error("Failed to fetch notes");
					}
					const data = (await response.json()) as NoteResponse;
					setNotes(data.notes);
					setLoading(false);
				}
			} catch (error) {
				console.error("Error fetching notes:", error);
			}
		};

		void fetchNotes();
	}, [user]);

	const reloadNotes = async () => {
		try {
			console.log("reloadNotes");
			setLoading(true);
			const response = await fetch(`${String(import.meta.env.VITE_API_NOTES)}${user?.userId}`);
			if (!response.ok) {
				throw new Error("Failed to fetch notes");
			}
			const data = (await response.json()) as NoteResponse;
			console.log("data", data.notes);
			setNotes(data.notes);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching notes:", error);
		}
	};

	return (
		<NotesContext.Provider value={{ notes, loading, reloadNotes }}>
			{children}
		</NotesContext.Provider>
	);
};

// Hook personalizado para acceder al contexto
export const useNotes = () => useContext(NotesContext);
