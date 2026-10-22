'use client';

import Image from "next/image";
import styles from './cadastro.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Cadastro() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');

    const [vinil, setVinil] = useState({
        artista: '',
        vinilNome: '',
        categoria: '',
        raridade: 'Comum',
        quantidade: 1,
        preco: '',
        assinado: false,
        imagem: ''
    });

    const [arquivoImagem, setArchivoImagem] = useState(null);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3001/api/vinil/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.erro) {
                        setVinil(data);
                    }
                })
                .catch((err) => console.error("Erro ao carregar vinil:", err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVinil({
            ...vinil,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        setArchivoImagem(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imagemUrl = vinil.imagem;

            if (arquivoImagem) {
                const formData = new FormData();
                formData.append('imagem', arquivoImagem);

                const resUpload = await fetch('http://localhost:3001/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const dataUpload = await resUpload.json();

                if (resUpload.ok) {
                    imagemUrl = dataUpload.imagem;
                } else {
                    setMensagem(dataUpload.erro || 'Erro ao enviar imagem.');
                    return;
                }
            }

            const metodo = id ? 'PUT' : 'POST';
            const url = id ? `http://localhost:3001/api/vinil/${id}` : 'http://localhost:3001/api/vinil';

            const resposta = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...vinil,
                    quantidade: Number(vinil.quantidade),
                    preco: Number(vinil.preco),
                    imagem: imagemUrl
                })
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                setMensagem(id ? 'Vinil atualizado com sucesso!' : 'Vinil cadastrado com sucesso!');
                setTimeout(() => router.push('/acervo'), 1500);
            } else {
                setMensagem(resultado.erro || 'Erro ao salvar vinil.');
            }
        } catch (erro) {
            console.error('Erro na requisição:', erro);
            setMensagem('Erro de conexão com o servidor.');
        }
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "600px" }}>
            <h1 className="mb-4">{id ? 'Editar Vinil' : 'Cadastro de Vinil'}</h1>
            
            {mensagem && <div className="alert alert-info">{mensagem}</div>}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Nome do Artista</label>
                    <input
                        type="text"
                        className="form-control"
                        name="artista"
                        value={vinil.artista}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Nome do Vinil</label>
                    <input
                        type="text"
                        className="form-control"
                        name="vinilNome"
                        value={vinil.vinilNome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <input
                        type="text"
                        className="form-control"
                        name="categoria"
                        value={vinil.categoria}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Raridade</label>
                    <select
                        className="form-select"
                        name="raridade"
                        value={vinil.raridade}
                        onChange={handleChange}
                    >
                        <option value="Comum">Comum</option>
                        <option value="Rara">Rara</option>
                        <option value="Lendária">Lendária</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Quantidade</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantidade"
                        value={vinil.quantidade}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Preço (R$)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="preco"
                        value={vinil.preco}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Foto da Capa</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="assinado"
                        checked={vinil.assinado}
                        onChange={handleChange}
                        id="assinadoCheck"
                    />
                    <label className="form-check-label" htmlFor="assinadoCheck">
                        Vinil Assinado
                    </label>
                </div>

                <button type="submit" className="btn btn-success w-100">
                    {id ? 'Salvar Alterações' : 'Cadastrar Vinil'}
                </button>
            </form>
        </div>
    );
}