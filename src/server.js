
import 'dotenv/config'
import connection from '../db/connection.js';
import app from './app.js';


const port = 3001;

app.listen(port, async () => {
  console.log(`API TrybeCash está sendo executada na porta ${port}`);
  // console.log(`Valor da variável de ambiente $USER: ${process.env.USER}`);
  // O código abaixo é para testarmos a comunicação com o MySQL
  const [ result ] = await connection.execute('SELECT 1');
  if (result) {
    console.log('MySQL connection OK');
  }

});