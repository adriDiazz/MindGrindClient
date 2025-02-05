import { fetchAuthSession, getCurrentUser, signOut as conginitoSingOut } from "aws-amplify/auth";
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
	checkSession: () => Promise<void>; 
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
	const [user, setUser] = useState<userType | null>(null);

	useEffect(() => {
		const checkUser = async () => {
			try {
				const session = await fetchAuthSession();

				if (session.tokens?.accessToken.payload.exp > Date.now() / 1000) {
					const authUser = await getCurrentUser();
					setUser(authUser as userType);
				} else {
					setUser(null);
				}
			} catch (error) {
				console.error("Failed to fetch user session:", error);
				setUser(null);
			}
		};

		const singOutCognito = async () => {
			try {
				await conginitoSingOut();
				setUser(null);
			} catch (error) {
				console.error("Error signing out:", error);
			}
		};

		Hub.listen("auth", (data) => {
			const { payload } = data;
			if (payload.event === "signIn" || payload.event === "signOut") {
				void checkUser();
			}
		});

		void checkUser();

		const intervalId = setInterval(() => {
			void checkUser(); 
		}, 5 * 60 * 1000); 

		return () => {
			void singOutCognito();
			clearInterval(intervalId);
		};
	}, []);

	const signOut = async () => {
		try {
			await conginitoSingOut();
			setUser(null);
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	const checkSession = async () => {
		try {
			const session = await fetchAuthSession();
			if (session.tokens?.accessToken.payload.exp < Date.now()/1000) {
				await signOut();
				setUser(null)
			}
			
		} catch (error) {
			console.error("Error checking session", error);
		}
	}

	const contextValue: UserContextValue = {
		user,
		signOut,
		setUser,
		checkSession
	};

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
