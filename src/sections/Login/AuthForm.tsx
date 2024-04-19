import { useState } from "react";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const AuthForm = () => {
	const [registerMode, setRegisterMode] = useState(false);

	return (
		<>
			{registerMode ? (
				<RegisterModal setRegisterMode={setRegisterMode} registerMode={registerMode} />
			) : (
				<LoginModal setRegisterMode={setRegisterMode} registerMode={registerMode} />
			)}
		</>
	);
};

export default AuthForm;
