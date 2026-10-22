import Link from "next/link";
import styles from "./cardVinil.module.css";

export default function VinilCard({ vinil, deletarVinil }) {
    const raridadeCor = vinil.raridade === "Comum" ? "gray" : vinil.raridade === "Rara" ? "blue" : "gold";
    const assinadoTexto = vinil.assinado ? "Assinado" : "Não Assinado";
    const assinadoCor = vinil.assinado ? "green" : "red";
    const corquantidade = vinil.quantidade > 20 ? "green" : "red";

    return (
        <div className="card" style={{ width: "23rem" }}>
            <div className="card-body">
                <img
                    src={vinil.imagem && vinil.imagem !== '' ? vinil.imagem : "../imagens/slide1.png"}
                    className="card-img"
                    alt={vinil.vinilNome}
                />

                <div className="d-flex justify-content-between align-items-center">
                    <div style={{ backgroundColor: raridadeCor, borderRadius: "5px", padding: "1px 6px", color: "white", fontWeight: "bold", fontSize: "0.75rem", marginTop: "10px" }}>
                        {vinil.raridade}
                    </div>

                    <div style={{ backgroundColor: assinadoCor, borderRadius: "5px", padding: "1px 6px", color: "white", fontWeight: "bold", fontSize: "0.75rem", marginTop: "10px" }}>
                        {assinadoTexto}
                    </div>

                    <div style={{ backgroundColor: "black", borderRadius: "5px", padding: "1px 6px", color: "white", fontWeight: "bold", fontSize: "0.75rem", marginTop: "10px" }}>
                        {vinil.categoria}
                    </div>
                </div>

                <h5 className="mt-2 mb-0">{vinil.vinilNome} <span className="text-muted fs-6">({vinil.artista})</span></h5>

                <p className="fs-5 fw-bold text-success">R$ {vinil.preco}</p>

                <small>Quantidade no estoque: <strong style={{ backgroundColor: corquantidade, borderRadius: "5px", padding: "1px 6px", color: "white", fontWeight: "bold", fontSize: "0.75rem", marginTop: "10px" }}>{vinil.quantidade}</strong></small>
            </div>

            <Link href={`../editar/id=${vinil.id}`}>
                <button className={styles.btnalterar}>
                    Alterar
                </button>
            </Link>
            <button type="button" className={styles.btnexcluir} onClick={() => deletarVinil(vinil.id)}>
                Excluir
            </button>
        </div>
    );
}