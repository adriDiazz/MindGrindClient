import { signIn, signUp } from "aws-amplify/auth";
import { FC, useState } from "react";

import styles from "./LoginModal.module.scss";
import VerificationCode from "./VerificationCode";

interface RegisterProps {
	setRegisterMode: (mode: boolean) => void;
	registerMode: boolean;
}

const RegisterModal: FC<RegisterProps> = ({ setRegisterMode, registerMode }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [nickname, _setNickname] = useState("nickname");
	const [registrationComplete, setRegistrationComplete] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signUp({
			username,
			password,
			options: {
				userAttributes: {
					name,
					nickname,
					email,
				},
			},
		})
			.then(() => {
				setRegistrationComplete(true);
			})
			.catch((error: Error) => {
				setError(error.message);
			});
	};

	const handleVerificationSuccess = () => {
		signIn({ username, password })
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error al iniciar sesión:", error);
			});
	};

	return (
		<>
			{!registrationComplete ? (
				<div className={styles.container}>
					<span>
						Welcome to <span>NoteTube</span>
					</span>
					<h3>Create your account</h3>

					<form className={styles.form} onSubmit={handleAuth}>
						<label htmlFor="">Enter your email address</label>
						<input
							type="text"
							placeholder="Email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label htmlFor="">Enter your Username</label>
						<input
							type="text"
							placeholder="Username"
							name="Username"
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

						<label htmlFor="">Enter your name</label>
						<input
							type="text"
							placeholder="Name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						{error && <span className={styles.error}>{error}</span>}
						<div className={styles.text}>
							<span
								onClick={() => {
									setRegisterMode(!registerMode);
								}}
							>
								Already have an account ?<span>Sign in</span>
							</span>
							<span>Forgot Password</span>
						</div>
						<div className={styles.btnWrapper}>
							<button className={styles.buttonGoogle} type="submit">
								Sign up
							</button>
							<button className={styles.buttonGoogle}>
								<img src="/google.png" alt="google.png" />
								Sign in with Google
							</button>
						</div>
					</form>
				</div>
			) : (
				<VerificationCode username={username} onVerificationSuccess={handleVerificationSuccess} />
			)}
		</>
	);
};

export default RegisterModal;
