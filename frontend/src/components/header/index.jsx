import "./header.css";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
    return (
        <>
            <header>
                <nav>
                    <ul className="menu-superior">
                        <li>
                            <img src="./imagens/logo.png" alt="Cabin 3" width="190px"/>
                        </li>
                        <li className="dropdown">
                            <a className="dropbtn" href="#">Explore</a>
                            <div className="dropdown-content">

                                <a href="#">Serviços e Portifólios</a>
                                <a href="#">Solicitação de Orçamento</a>
                                <a href="#">Conheça nossa equipe</a>
                                <a href="#">Planos de Manutenção</a>

                            </div>
                        </li>

                        <li className="singr"><a href="cadastro.html" target="_blank">Sign up</a></li>
                        <li className="login"><a href="login.html" target="_blank">Log in</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}