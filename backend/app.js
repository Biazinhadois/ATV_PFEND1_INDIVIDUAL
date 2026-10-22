import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { mkdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const app = express();
const uploadDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'uploads');
mkdirSync(uploadDir, { recursive: true });

const extensoesPermitidas = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp'
};

const uploadImagem = multer({
    storage: multer.diskStorage({
        destination: uploadDir,
        filename: (_req, file, callback) => {
            callback(null, `${randomUUID()}${extensoesPermitidas[file.mimetype]}`);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, callback) => {
        if (!extensoesPermitidas[file.mimetype]) {
            return callback(new Error('Envie uma imagem PNG, JPEG, GIF ou WEBP.'));
        }
        callback(null, true);
    }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));
app.use('/imagens', express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), '../frontend/public/imagens')));

let listaVinis = [
    {
        id: 1,
        artista: 'Adela',
        vinilNome: 'Prima',
        categoria: 'Pop',
        raridade: 'Rara',
        quantidade: 2,
        preco: 120,
        assinado: true,
        imagem: '/imagens/adela.png'
    },
    {
        id: 2,
        artista: 'The Midnight',
        vinilNome: 'Monsters',
        categoria: 'Synthwave',
        raridade: 'Lendária',
        quantidade: 1,
        preco: 250,
        assinado: false,
        imagem: '/imagens/midnight.png'
    },
    {
        id: 3,
        artista: 'Daft Punk',
        vinilNome: 'Random Access Memories',
        categoria: 'Eletrônica',
        raridade: 'Comum',
        quantidade: 4,
        preco: 180,
        assinado: false,
        imagem: '/imagens/daftpunk.png'
    },
    {
        id: 4,
        artista: 'Chappell Roan',
        vinilNome: 'The Rise and Fall of a Midwest Princess',
        categoria: 'Pop',
        raridade: 'Rara',
        quantidade: 3,
        preco: 195,
        assinado: true,
        imagem: '/imagens/chappell.png'
    },
    {
        id: 5,
        artista: 'Tame Impala',
        vinilNome: 'Currents',
        categoria: 'Alternativo',
        raridade: 'Rara',
        quantidade: 2,
        preco: 210,
        assinado: false,
        imagem: '/imagens/tameimpala.png'
    },
    {
        id: 6,
        artista: 'Laufey',
        vinilNome: 'Bewitched',
        categoria: 'Jazz',
        raridade: 'Lendária',
        quantidade: 1,
        preco: 230,
        assinado: true,
        imagem: '/imagens/laufey.png'
    },
    {
        id: 7,
        artista: 'The Weeknd',
        vinilNome: 'After Hours',
        categoria: 'R&B',
        raridade: 'Comum',
        quantidade: 5,
        preco: 160,
        assinado: false,
        imagem: '/imagens/theweeknd.png'
    },
    {
        id: 8,
        artista: 'Tyler, The Creator',
        vinilNome: 'Call Me If You Get Lost',
        categoria: 'Hip Hop',
        raridade: 'Rara',
        quantidade: 3,
        preco: 200,
        assinado: true,
        imagem: '/imagens/tyler.png'
    },
    {
        id: 9,
        artista: 'Billie Eilish',
        vinilNome: 'Hit Me Hard and Soft',
        categoria: 'Pop',
        raridade: 'Rara',
        quantidade: 3,
        preco: 215,
        assinado: false,
        imagem: '/imagens/billie.png'
    },
    {
        id: 10,
        artista: 'Arctic Monkeys',
        vinilNome: 'AM',
        categoria: 'Rock',
        raridade: 'Comum',
        quantidade: 6,
        preco: 150,
        assinado: false,
        imagem: '/imagens/arctic.png'
    },
    {
        id: 11,
        artista: 'Lana Del Rey',
        vinilNome: 'Norman Fucking Rockwell!',
        categoria: 'Alternativo',
        raridade: 'Lendária',
        quantidade: 1,
        preco: 280,
        assinado: true,
        imagem: '/imagens/lana.png'
    },
    {
        id: 12,
        artista: 'Fleetwood Mac',
        vinilNome: 'Rumours',
        categoria: 'Rock',
        raridade: 'Rara',
        quantidade: 4,
        preco: 190,
        assinado: false,
        imagem: '/imagens/fleetwood.png'
    },
    {
        id: 13,
        artista: 'Frank Ocean',
        vinilNome: 'Blonde',
        categoria: 'R&B',
        raridade: 'Lendária',
        quantidade: 1,
        preco: 320,
        assinado: true,
        imagem: '/imagens/frankocean.png'
    },
    {
        id: 14,
        artista: 'Kanye West',
        vinilNome: 'Graduation',
        categoria: 'Hip Hop',
        raridade: 'Rara',
        quantidade: 2,
        preco: 240,
        assinado: false,
        imagem: '/imagens/kanye.png'
    },
    {
        id: 15,
        artista: 'Pink Floyd',
        vinilNome: 'The Dark Side of the Moon',
        categoria: 'Rock',
        raridade: 'Comum',
        quantidade: 5,
        preco: 175,
        assinado: false,
        imagem: '/imagens/pinkfloyd.png'
    }
];

app.get('/api/check', (req, res) => {
    res.status(200).json({
        status: 'ok',
        mensagem: 'Servidor funcionando via HTTP!'
    });
});

app.post('/api/upload', (req, res, next) => {
    uploadImagem.single('imagem')(req, res, (erro) => {
        if (erro) {
            return res.status(400).json({
                erro: erro.message || 'Não foi possível enviar a imagem.'
            });
        }
        next();
    });
}, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ erro: 'Selecione uma imagem para enviar.' });
    }

    res.status(201).json({
        imagem: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    });
});

app.get('/api/vinil', (req, res) => {
    res.status(200).json(listaVinis);
});

app.get('/api/vinil/:id', (req, res) => {
    const id = Number(req.params.id);
    const vinilEncontrado = listaVinis.find((f) => f.id === id);

    if (!vinilEncontrado) {
        return res.status(404).json({
            erro: 'Vinil não encontrado'
        });
    }

    res.status(200).json(vinilEncontrado);
});

app.post('/api/vinil', (req, res) => {
    const { artista, vinilNome, raridade, categoria, quantidade, imagem, preco, assinado } = req.body;

    if (
        typeof artista !== 'string' || !artista.trim() ||
        typeof vinilNome !== 'string' || !vinilNome.trim() ||
        typeof categoria !== 'string' || !categoria.trim() ||
        typeof raridade !== 'string' || !raridade.trim() ||
        typeof assinado !== 'boolean' ||
        !Number.isInteger(Number(quantidade)) || Number(quantidade) < 1 ||
        !Number.isInteger(Number(preco)) || Number(preco) < 1
    ) {
        return res.status(400).json({
            erro: 'Dados do Vinil inválidos'
        });
    }

    const novoVinil = {
        id: listaVinis.length > 0
            ? Math.max(...listaVinis.map((f) => f.id)) + 1
            : 1,
        artista: artista.trim(),
        vinilNome: vinilNome.trim(),
        categoria: categoria.trim(),
        raridade: raridade.trim(),
        quantidade: Number(quantidade),
        preco: Number(preco),
        assinado: Boolean(assinado),
        imagem: typeof imagem === 'string' && imagem.trim() ? imagem.trim() : ''
    };

    listaVinis.push(novoVinil);

    res.status(201).json(novoVinil);
});

app.put('/api/vinil/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = listaVinis.findIndex((f) => f.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Vinil não encontrado'
        });
    }

    const { artista, vinilNome, raridade, categoria, quantidade, imagem, preco, assinado } = req.body;

    if (
        typeof artista !== 'string' || !artista.trim() ||
        typeof vinilNome !== 'string' || !vinilNome.trim() ||
        typeof categoria !== 'string' || !categoria.trim() ||
        typeof raridade !== 'string' || !raridade.trim() ||
        typeof assinado !== 'boolean' ||
        !Number.isInteger(Number(quantidade)) || Number(quantidade) < 1 ||
        !Number.isInteger(Number(preco)) || Number(preco) < 1
    ) {
        return res.status(400).json({
            erro: 'Dados do Vinil inválidos'
        });
    }

    listaVinis[indice] = {
        id,
        artista: artista.trim(),
        vinilNome: vinilNome.trim(),
        categoria: categoria.trim(),
        raridade: raridade.trim(),
        quantidade: Number(quantidade),
        preco: Number(preco),
        assinado: Boolean(assinado),
        imagem: typeof imagem === 'string' && imagem.trim()
            ? imagem.trim()
            : listaVinis[indice].imagem
    };

    res.status(200).json(listaVinis[indice]);
});

app.delete('/api/vinil/:id', (req, res) => {
    const id = Number(req.params.id);
    const vinilExiste = listaVinis.some((f) => f.id === id);

    if (!vinilExiste) {
        return res.status(404).json({
            erro: 'Vinil não encontrado'
        });
    }

    listaVinis = listaVinis.filter((f) => f.id !== id);

    res.status(200).json({
        mensagem: 'Vinil excluído com sucesso'
    });
});

app.use((req, res) => {
    res.status(404).json({
        erro: `A rota ${req.method} ${req.originalUrl} não existe`
    });
});

app.use((erro, req, res, _next) => {
    console.error('Erro de Sistema:', erro.message);

    res.status(500).json({
        erro: 'Falha interna do servidor'
    });
});