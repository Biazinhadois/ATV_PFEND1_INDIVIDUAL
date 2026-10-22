import "./header.css";

export default function Header() {
    return (
        <>
            <header>
                <nav>
                    <ul className="menu-superior">
                        <li>
                            <img src="../imagens/logo.png" alt="Cabin 3" width="190px" />
                        </li>

                        <li className="login"><a href="../acervo">Cadastrar Vinil</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}