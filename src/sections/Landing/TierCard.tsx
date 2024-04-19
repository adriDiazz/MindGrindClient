import "./TierCard.css";

import { Glow, GlowCapture } from "@codaworks/react-glow";
import { FC } from "react";

interface TierCardProps {
	color?: string;
	setOpened?: (value: boolean) => void;
}

interface TEXTSType {
	[key: string]: {
		title: string;
		text: string;
	};
}

const TEXTS: TEXTSType = {
	green: {
		title: "Free Tier",
		text: "orem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de",
	},
	blue: {
		title: "Pro Tier",
		text: "orem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de",
	},
	purple: {
		title: "MasterMind Tier",
		text: "orem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de",
	},
};

const TierCard: FC<TierCardProps> = ({ color = "green", setOpened }) => {
	return (
		<GlowCapture>
			<Glow color="var(--purple)">
				<div className={`wrapper-${color} glowable-text`}>
					<span>{TEXTS[color].title}</span>
					<p>{TEXTS[color].text}</p>
					<div className="btnWrapper">
						<button
							className={`btn-${color}`}
							onClick={() => {
								if (setOpened) {
									setOpened(true);
								}
							}}
						>
							Register
						</button>
					</div>
				</div>
			</Glow>
		</GlowCapture>
	);
};

export default TierCard;
