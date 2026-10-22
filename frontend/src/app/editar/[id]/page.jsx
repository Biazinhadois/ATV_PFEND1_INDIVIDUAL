'use client';

import Image from "next/image";
import styles from './editar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function FormularioEditar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    let id = searchParams.get('id');
    if (!id && typeof window !== 'undefined') {
        const partes = window.location.pathname.split('/');
        const idParte = partes.find(p => p.startsWith('id='));
        if (idParte) {
            id = idParte.split('=')[1];
        }
    }

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

    const [arquivoImagem, setArquivoImagem] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3001/api/vinil/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.erro) {
                        setVinil(data);
                    } else {
                        setMensagem('Vinil não encontrado.');
                    }
                    setCarregando(false);
                })
                .catch((err) => {
                    console.error("Erro ao carregar vinil:", err);
                    setMensagem('Erro ao carregar dados do servidor.');
                    setCarregando(false);
                });
        } else {
            setCarregando(false);
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
        setArquivoImagem(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let idAtual = searchParams.get('id');
        if (!idAtual && typeof window !== 'undefined') {
            const partes = window.location.pathname.split('/');
            const idParte = partes.find(p => p.startsWith('id='));
            if (idParte) {
                idAtual = idParte.split('=')[1];
            }
        }

        const metodo = idAtual ? 'PUT' : 'POST';
        const url = idAtual ? `http://localhost:3001/api/vinil/${idAtual}` : 'http://localhost:3001/api/vinil';

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
                setMensagem(idAtual ? 'Vinil atualizado com sucesso!' : 'Vinil cadastrado com sucesso!');
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
        <div className="container mt-5 mb-5">
            <h2>{id ? 'Editar Vinil' : 'Cadastrar Novo Vinil'}</h2>

            {mensagem && <div className="alert alert-info">{mensagem}</div>}

            <form onSubmit={handleSubmit} className="mt-4">
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
                        className="form-control"
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

                <button type="submit" className="btn btn-success">
                    {id ? 'Salvar Alterações' : 'Cadastrar Vinil'}
                </button>
            </form>
        </div>
    );
}

export default function Editar() {
    return (
        <Suspense fallback={<div className="container mt-5">Carregando...</div>}>
            <FormularioEditar />
        </Suspense>
    );
}