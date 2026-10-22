import { app } from './app.js';

process.loadEnvFile('.env');

const porta = process.env.PORT || 3001;

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});