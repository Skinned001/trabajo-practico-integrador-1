import { express } from 'express';


const app = express();
const PORT = 3000;

app.use(express.JSON());

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});


connectDB().then(() => {
  app.listen(PORT, () =>
    console.log('>>> Servidor escuchando en http://localhost:' + PORT)
  );
});