import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());

app.get('/', (_req, res) => {
  res.send('Servidor está funcionando!');
});

export default app; 