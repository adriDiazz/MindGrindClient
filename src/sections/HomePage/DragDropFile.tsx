/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "./DragDrop.css";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

import ModalComponent from "../Ui/ModalComponent";
import DocModal from "./DocModal";

const DragDrop = ({ files, setFiles, allClosed, setAllClosed }) => {
	const [dragActive, setDragActive] = useState(false);
	const [opened, setOpened] = useState(false);

	const inputRef = useRef(null);

	const handleDrag = function (e: any) {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = function (e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer?.files && e.dataTransfer?.files[0]) {
			setAllClosed(false);
			setOpened(true);
			setFiles(e.dataTransfer?.files);
		}
	};

	const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			setAllClosed(false);
			setOpened(true);
			setFiles(e.target.files);
		}
	};

	return (
		<>
			<form
				id="form-file-upload"
				onDragEnter={handleDrag}
				onDragLeave={handleDrag} // Agrega esta línea para gestionar dragleave
				onDragOver={handleDrag}
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					ref={inputRef}
					type="file"
					id="input-file-upload"
					multiple={true}
					onChange={handleChange}
				/>
				<label
					id="label-file-upload"
					htmlFor="input-file-upload"
					className={dragActive ? "drag-active" : ""}
				>
					<div className="dragLogoWrapper">
						<img src="upload.png" alt="" />
						<p>Drag and drop your file here or click here</p>
						<p className="greyText">Support only pdf documens</p>
					</div>
				</label>
				{dragActive && (
					<div
						id="drag-file-element"
						onDragEnter={handleDrag}
						onDragLeave={handleDrag}
						onDragOver={handleDrag}
						onDrop={handleDrop}
					></div>
				)}
			</form>
			<ToastContainer />
			{!allClosed && (
				<ModalComponent opened={opened} setOpened={setOpened}>
					{files.length === 1 && !allClosed && (
						<DocModal files={files} setAllClosed={setAllClosed} allClosed={allClosed} />
					)}
				</ModalComponent>
			)}
		</>
	);
};

export default DragDrop;
