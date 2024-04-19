import { useEffect, useState } from "react";

import styles from "./DocModal.module.scss";
import DocModalContent from "./DocModalContent";

const DocModal = ({ files, setAllClosed, allClosed }) => {
	const [imageSrc, setImageSrc] = useState("");
	const [selectingDirectory, setSelectingDirectory] = useState(false);
	const [fileName, setFilename] = useState(files[0].name);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (
			files[0].type.startsWith("image/") ||
			files[0].type.startsWith("application/pdf") ||
			files[0].type.startsWith("video/")
		) {
			const reader = new FileReader();

			reader.onload = function (e) {
				setImageSrc(e.target?.result as string);
			};

			reader.readAsDataURL(files[0]);
		} else {
			setError(true);
		}
	}, [files]);

	return (
		<div className={styles.modalWrapper}>
			<DocModalContent
				files={files}
				imageSrc={imageSrc}
				setSelectingDirectory={setSelectingDirectory}
				fileName={fileName}
				setFilename={setFilename}
			/>

			{error && <h2>Solo se permiten archivos de tipo imagen, video o pdf</h2>}
		</div>
	);
};

export default DocModal;
