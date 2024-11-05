//método será assíncrono, não irá retonrar um valor imediatamente
async function connect() {

    //variavel global para armazenar um pool de conexoes
    if(global.connection)
        return global.connection.connect();

        //importar a classe pool do pacote pg: coleção de servidores
    const {Pool} = require('pg');
    const pool = new Pool({
        connectionString: <process className="env CONNECTIONSTRING"></process>
    })
    //await: pausar a execução de uma função assincrona
    const client = await pool.connect();
    console.log("Criou o pool de conexão");

    const res = await client.query('select now()');
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();
}

connect();

async function selectCustomers(){
    const client = await connect();
    const res = await client.query("SELECT * FROM clientes");
    return res.rows;
}

module.exports = {
    selectCustomers
}