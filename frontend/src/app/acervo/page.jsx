'use client';

import Image from "next/image";
import styles from './acervo.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import CardVinil from "../../components/CardVinil/index";

export default function AcervoPage() {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    const [vinis, setVinis] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/vinil")
            .then((resposta) => resposta.json())
            .then((dados) => setVinis(dados))
            .catch((erro) => console.error("Erro ao buscar vinis:", erro));
    }, []);

    const deletarVinil = async (id) => {
        try {
            await fetch(`http://localhost:3001/api/vinil/${id}`, { method: "DELETE" });
            setVinis(vinis.filter((v) => v.id !== id));
        } catch (erro) {
            console.error("Erro ao deletar:", erro);
        }
    };

    return (
        <>
            <main>
                <div className={styles.acervoContainer}>
                    <a href="./" className={styles.voltar}>Voltar</a>
                    <h1 className={styles.titles}>
                        Acervo:
                    </h1>

                    <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center align-items-center"
                        style={{ marginLeft: '150px' }}>
                        {vinis.length === 0 ? (
                            <p className="mensagem-vazia">Nenhum vinil cadastrado ainda.</p>
                        ) : (
                            vinis.map((vinil) => (
                                <div className="col" key={vinil.id}>
                                    <CardVinil
                                        vinil={vinil}
                                        deletarVinil={deletarVinil}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}