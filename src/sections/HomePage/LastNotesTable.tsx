/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelectedNote } from "../../context/SelectedNoteContext";
import { useUser } from "../../context/UserContext";
import { getLastModifiedNotes } from "../../services/NotesService";
import { Note } from "../../types/types";
import FolderTableIcon from "../Ui/Icons/FolderTableIcon";

export default function LastNotesTable() {
	const [data, setData] = useState<Note[]>([]);
	const { user } = useUser();
	const { setSelectedNote } = useSelectedNote();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			void getLastModifiedNotes(user.userId).then((res) => {
				setData(res);
			});
		}
	}, [user]);

	return (
		<TableContainer
			component={Paper}
			sx={{
				width: "96%",
			}}
		>
			<Table
				sx={{
					width: "100%",
				}}
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Document</TableCell>
						<TableCell align="right">Category</TableCell>
						<TableCell align="right">Last Modfied</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
						data?.length === 0 && (
							<TableRow>
								<TableCell colSpan={4} align="center">
									No notes found
								</TableCell>
							</TableRow>
						)
					}
					{data?.map((row) => (
						<TableRow
							key={row.noteId}
							sx={{
								"&:last-child td, &:last-child th": { border: 0 },
								"&:hover": {
									backgroundColor: "rgba(0, 0, 0, 0.04)", // Cambia esto según tu preferencia
								},
								cursor: "pointer",
							}}
							onClick={() => {
								setSelectedNote(row);
								navigate(`/notes/${row.noteId}`, {
									state: { data: { data: row }, user },
								});
							}}
						>
							<TableCell component="th" scope="row">
								<FolderTableIcon />
							</TableCell>
							<TableCell component="th" scope="row">
								{row.title}
							</TableCell>
							<TableCell align="right">{row.category ?? "General"}</TableCell>
							<TableCell align="right">{new Date(row.updatedAt).toLocaleDateString()}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
