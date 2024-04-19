import { signIn } from "aws-amplify/auth";
import { FC, useState } from "react";

import GoogleIcon from "../Ui/Icons/GoogleIcon";
import styles from "./LoginModal.module.scss";

interface LoginProps {
	setRegisterMode: (mode: boolean) => void;
	registerMode: boolean;
}

const LoginModal: FC<LoginProps> = ({ setRegisterMode, registerMode }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signIn({ username, password })
			.then(() => {
				window.location.reload();
			})
			.catch((error: Error) => {
				setError(error.message);
			});
	};

	return (
		<div className={styles.container}>
			<span>
				Welcome to <span>NoteTube</span>
			</span>
			<h3>Sign in</h3>

			<form className={styles.form} onSubmit={handleAuth}>
				<label htmlFor="">Enter your Username</label>
				<input
					type="text"
					placeholder="Username"
					name="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="">Enter your Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && <span className={styles.error}>{error}</span>}
				<div className={styles.text}>
					<span
						onClick={() => {
							setRegisterMode(!registerMode);
						}}
					>
						Don't have an account ?<span>Sign up</span>
					</span>
					<span>Forgot Password</span>
				</div>
				<div className={styles.btnWrapper}>
					<button className={styles.buttonGoogle} type="submit">
						Sign in
					</button>
					<button className={styles.buttonGoogle}>
						<GoogleIcon />
						Sign in with Google
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginModal;
