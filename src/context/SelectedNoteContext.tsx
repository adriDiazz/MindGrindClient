import React, { createContext, useContext, useState } from "react";

import { Note } from "../types/types";

// Definimos el contexto
const SelectedNoteContext = createContext({
	selectedNote: undefined as Note | undefined,
	setSelectedNote: (note: Note) => {},
});

// Proveedor del contexto
export const SelectedNoteProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedNote, setSelectedNote] = useState<Note>();

	return (
		<SelectedNoteContext.Provider value={{ selectedNote, setSelectedNote }}>
			{children}
		</SelectedNoteContext.Provider>
	);
};

// Hook personalizado para acceder al contexto
export const useSelectedNote = () => useContext(SelectedNoteContext);
