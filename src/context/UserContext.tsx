// UserContext.tsx
import { getCurrentUser, signOut as SingOut } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UserContextProps {
	children: ReactNode;
}

export type userType = {
	signInDetails: {
		loginId: string;
		authFlowType: string;
	};
	userId: string;
	username: string;
};

interface UserContextValue {
	user: userType | null;
	signOut: () => void;
	setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUser = (): UserContextValue => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}

	return context;
};

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
	const [user, setUser] = useState<userType | null>(null); // Cambia 'any' por el tipo adecuado para tu objeto de usuario

	useEffect(() => {
		const checkUser = async () => {
			try {
				const authUser = await getCurrentUser();
				// eslint-disable-next-line no-console
				console.log(authUser);
				setUser(authUser as userType);
			} catch (error) {
				setUser(null);
			}
		};

		Hub.listen("auth", (data) => {
			const { payload } = data;
			if ((payload.event as string) === "signIn") {
				void checkUser();
			} else if ((payload.event as string) === "signOut") {
				setUser(null);
			}
		});

		void checkUser();
	}, []);

	const signOut = async () => {
		try {
			await SingOut();
			setUser(null);
		} catch (error) {
			console.error("Error al cerrar sesión:", error);
		}
	};

	const contextValue: UserContextValue = {
		user,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		signOut,
		setUser,
	};

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
