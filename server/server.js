const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 15432,
  database: 'hambre_fiambre',  
  user: 'postgres',     
  password: 'postgres', 
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// REGISTRO
app.post('/api/user/register', async (req, res) => {
  try {
    const insertRes = await pool.query(
      `INSERT INTO usuario (userName, password, name, age, blodGroup, kidneys, religion, healthStatus, typeUser, n_pedidos, n_fallidos) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        req.body.userName, 
        req.body.password, 
        req.body.name, 
        req.body.age, 
        req.body.blodGroup,
        req.body.kidneys, 
        req.body.religion, 
        req.body.healthStatus, 
        'user',
        0,  // n_pedidos por defecto
        0   // n_fallidos por defecto
      ]
    );
    
    if (insertRes.rowCount > 0){
      res.json({message: "Registro Okey"})
    } else {
      res.json({message: "Registro No Okey"})
    }
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({message: "Error en el servidor"});
  }
});

// LOGIN
app.post('/api/user/login', async (req, res) => {
  try {
    const selectRes = await pool.query(
      `SELECT id, userName, name, age, blodGroup, kidneys, religion, healthStatus, n_pedidos, n_fallidos 
       FROM usuario 
       WHERE userName = $1 AND password = $2`,
      [req.body.userName, req.body.password]
    );
    
    if (selectRes.rowCount > 0){
      res.json({
        ...selectRes.rows[0], 
        message: "Login Okey"
      });
    } else {
      res.json({message: "Login No Okey"});
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({message: "Error en el servidor"});
  }
});

// OBTENER n_pedidos ACTUAL
app.get('/api/user/hacerPedido', async (req, res) => {
  try {
    const { userName } = req.query;
    
    if (!userName) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere el userName'
      });
    }
    
    const result = await pool.query(
      'SELECT n_pedidos FROM usuario WHERE userName = $1',
      [userName]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    const n_pedidos = result.rows[0].n_pedidos;
    
    res.json({
      success: true,
      n_pedidos: n_pedidos,
      message: `NÃºmero de pedidos actual: ${n_pedidos}`
    });
    
  } catch (error) {
    console.error('Error al obtener n_pedidos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// INCREMENTAR n_pedidos
app.put('/api/user/incrementarPedido', async (req, res) => {
  try {
    const { userName } = req.body;
    
    if (!userName) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere el userName'
      });
    }
    
    const result = await pool.query(
      'UPDATE usuario SET n_pedidos = n_pedidos + 1 WHERE userName = $1 RETURNING n_pedidos',
      [userName]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    const nuevo_n_pedidos = result.rows[0].n_pedidos;
    
    res.json({
      success: true,
      n_pedidos: nuevo_n_pedidos,
      message: `Pedido incrementado. Nuevo total: ${nuevo_n_pedidos}`
    });
    
  } catch (error) {
    console.error('Error al incrementar pedido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

app.listen(3000);