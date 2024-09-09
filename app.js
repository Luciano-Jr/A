const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const port = 3000;

// Inicializando Firebase Admin SDK
const serviceAccount = require('./firebase-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://agend-today.firebaseio.com" // Coloque sua URL do banco de dados
});

const db = admin.firestore();

// Servindo arquivos estáticos como o HTML
app.use(express.static(path.join(__dirname, 'public')));

// Rota para buscar dados do Firebase e enviar para o HTML
app.get('/dados', async (req, res) => {
  try {
    const snapshot = await db.collection('cadastro').get();
    const dados = [];

    snapshot.forEach(doc => {
      dados.push(doc.data());
    });

    // Retorna os dados como JSON para a página HTML
    res.json(dados);
  } catch (error) {
    res.status(500).send('Erro ao buscar dados do Firebase');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
