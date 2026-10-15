import 'dotenv/config'; 
import app from './app.js';

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
}).on('error', (err) => {
  console.error(`Erro ao iniciar o servidor: ${err.message}`);
  process.exit(1);
});
