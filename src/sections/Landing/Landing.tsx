import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import AuthForm from "../Login/AuthForm";
import Button from "../Ui/Button";
import ModalComponent from "../Ui/ModalComponent";
import styles from "./Landing.module.scss";
import TierCard from "./TierCard";

const Landing = () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { user } = useUser();
	const [opened, setOpened] = useState(false);

	if (user) {
		return <Navigate to="/home" />;
	}

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.innerWrapper}>
					<div className={styles.rightWrapper}>
						<h1>
							A Better Way To <br />
							<span>Keep Productive</span>
						</h1>
						<p>
							Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
							<br />
							Lorem Ipsum ha sido el texto de relleno estándar de
						</p>
						<div className={styles.btnWrapper}>
							<Button onClick={() => setOpened(true)}>Register</Button>
							<Button isWhite onClick={() => setOpened(true)}>
								Log in
							</Button>
						</div>
					</div>
					<img src="/imageVr.png" alt="" />
				</div>
			</div>
			<div className={styles.banner}>
				<h1>A Better Way To</h1>
				<img src="/Star.png" alt="" />
				<h1>Keep Productive</h1>
			</div>
			<div className={styles.tierWrapper}>
				<h2>A Perfect Tool For Everyone</h2>
				<div className={styles.cardWrapper}>
					<TierCard color="green" setOpened={setOpened} />
					<TierCard color="blue" setOpened={setOpened} />
					<TierCard color="purple" setOpened={setOpened} />
				</div>
			</div>

			<div className={styles.iaWrapper}>
				<div className={styles.text}>
					<h2>Create with AI</h2>
					<p>
						Revoluciona tu forma de crear contenido con Estudio Mágico, nuestro paquete de
						herramientas con IA. Genera texto con la voz de tu marca usando Escritura Mágica o
						transforma tus fotos con Edición Mágica.
					</p>
				</div>
				<div className={styles.imgWrapper}>
					<img src="/iaImage.png" alt="" className={styles.img} />
				</div>
			</div>
			<div className={styles.footerWrapper}>
				<div className={styles.socialIcons}>
					<img src="/Vector.png" alt="" />
					<img src="/Vector(1).png" alt="" />
					<img src="/Vector(2).png" alt="" />
				</div>
				<div className="">
					<h2>Company</h2>
					<p>About</p>
					<p>Blog</p>
					<p>Careers</p>
					<p>Contact</p>
				</div>
				<div className="">
					<h2>Product</h2>
					<p>Overview</p>
					<p>Features</p>
					<p>Integrations</p>
					<p>Pricing</p>
					<p>Use Cases</p>
				</div>
			</div>

			<ModalComponent opened={opened} setOpened={setOpened}>
				<AuthForm />
			</ModalComponent>
		</>
	);
};

export default Landing;
