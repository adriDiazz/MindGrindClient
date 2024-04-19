import { confirmSignUp } from "aws-amplify/auth";
import React, { ChangeEvent, useState } from "react";

import Button from "../Ui/Button";
import styles from "./VerificationCode.module.scss";

interface VerificationCodeInputProps {
	username: string;
	onVerificationSuccess: () => void;
}

const VerificationCode: React.FC<VerificationCodeInputProps> = ({
	username,
	onVerificationSuccess,
}) => {
	const [verificationCode, setVerificationCode] = useState<string>("");

	const handleVerification = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		confirmSignUp({
			username,
			confirmationCode: verificationCode,
		})
			.then(() => {
				onVerificationSuccess();
			})
			.catch((error) => {
				console.error("Error al verificar:", error);
			});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setVerificationCode(e.target.value);
	};

	return (
		<div>
			<form className={styles.wrapper} onSubmit={handleVerification}>
				<label>
					Verification Code:
					<input type="text" value={verificationCode} onChange={handleChange} placeholder="Code" />
				</label>
				<br />
				<Button type="submit">Verify</Button>
			</form>
		</div>
	);
};

export default VerificationCode;
