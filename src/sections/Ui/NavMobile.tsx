import { FC } from "react";

import Button from "./Button";
import styles from "./NavMobile.module.scss";

interface NavMobilePropType {
	LINKS: string[];
}

const NavMobile: FC<NavMobilePropType> = ({ LINKS }) => {
	return (
		<div className={styles.wrapper}>
			<ul className={styles.navList}>
				{LINKS.map((link) => (
					<li key={link}>
						<a href="todo" className={styles.link}>
							{link}
						</a>
						<hr />
					</li>
				))}
				<li className={styles.Login}>
					<Button className={styles.button}>Log in</Button>
				</li>
			</ul>
		</div>
	);
};

export default NavMobile;
