import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { NotesProvider } from "./context/NoteContext";
import { SelectedNoteProvider } from "./context/SelectedNoteContext";
import { UserProvider } from "./context/UserContext";
import EditorPage from "./sections/EditorPage/EditorPage";
import ExamPage from "./sections/ExamPage/ExamPage";
import HomePage from "./sections/HomePage/HomePage";
import Landing from "./sections/Landing/Landing";
import NotesPage from "./sections/NotesPage/NotesPage";
import NavBar from "./sections/Ui/NavBar";
import Exam from "./sections/ExamPage/Exam";
import ExamComponent from "./sections/ExamPage/Exam";

export function App() {
	const [isEditorUrl, setIsEditorUrl] = useState(false);

	return (
		<>
			<UserProvider>
				<NotesProvider>
					<SelectedNoteProvider>
						{isEditorUrl ? null : <NavBar />}
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route path="/screenshot" element={<div>pito</div>} />
							<Route path="/home" element={<HomePage setIsEditorUrl={setIsEditorUrl} />} />
							<Route path="/editor" element={<EditorPage setIsEditorUrl={setIsEditorUrl} />} />
							<Route path="/exams" element={<ExamPage />} />
							<Route path="/exams">
								<Route path="" element={<ExamPage />} />
								<Route path=":noteId" element={<ExamComponent />} />
							</Route>
							<Route path="/notes">
								<Route path="" element={<NotesPage />} />
								<Route path=":noteId" element={<EditorPage setIsEditorUrl={setIsEditorUrl} />} />
							</Route>
							<Route path="*" element={<h2>404</h2>} />
						</Routes>
					</SelectedNoteProvider>
				</NotesProvider>
			</UserProvider>
		</>
	);
}
