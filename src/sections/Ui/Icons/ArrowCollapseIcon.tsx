import React from "react";

type ArrowCollapseIconProps = {
	onClick: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
	style: React.CSSProperties;
};

const ArrowCollapseIcon = ({ onClick, style }: ArrowCollapseIconProps) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			style={style} // Aplicar estilos externos aquí
		>
			<path
				d="M20.7189 6H18.9611C18.8415 6 18.729 6.05859 18.6587 6.15469L12.0001 15.3328L5.34152 6.15469C5.27121 6.05859 5.15871 6 5.03918 6H3.28136C3.12902 6 3.03996 6.17344 3.12902 6.29766L11.3931 17.6906C11.6931 18.1031 12.3071 18.1031 12.6048 17.6906L20.8689 6.29766C20.9603 6.17344 20.8712 6 20.7189 6Z"
				fill="#A0A0A0"
			/>
		</svg>
	);
};

export default ArrowCollapseIcon;
