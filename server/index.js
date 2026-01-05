const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Handling
let db;

async function connectDB() {
    try {
        db = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log('✅ Conectado a la base de datos MySQL');
    } catch (err) {
        console.error('❌ Error al conectar a la base de datos:', err.message);
        console.log('Reintentando en 5 segundos...');
        setTimeout(connectDB, 5000);
    }
}

connectDB();

// --- Rutas ---

// 1. Ruta para Contacto (Formulario General)
app.post('/api/contacto', async (req, res) => {
    const { nombre, telefono, direccion, mensaje } = req.body;

    if (!nombre || !telefono) {
        return res.status(400).json({ error: 'Nombre y teléfono son obligatorios.' });
    }

    try {
        const query = `
            INSERT INTO contactos (nombre_completo, telefono_whatsapp, barrio_direccion, mensaje, fecha_contacto, atendido)
            VALUES (?, ?, ?, ?, NOW(), 0)
        `;
        const [result] = await db.execute(query, [nombre, telefono, direccion || '', mensaje || '']);

        console.log(`📩 Nuevo contacto recibido: ${nombre} (${telefono})`);
        res.status(201).json({ message: 'Contacto guardado exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error al guardar contacto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// 2. Ruta para Averías/Soporte
app.post('/api/averias', async (req, res) => {
    const { nombre, telefono, zona, detalles } = req.body;

    if (!nombre || !telefono || !detalles) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    try {
        // Opcional: Podrías buscar si el cliente ya existe en una tabla 'clientes' para vincularlo
        // const [clientes] = await db.execute('SELECT id FROM clientes WHERE telefono = ?', [telefono]);
        // const clienteId = clientes.length > 0 ? clientes[0].id : null;

        const query = `
            INSERT INTO averias (nombre_completo, telefono_contacto, zona_barrio, detalles_averia, fecha_reporte, estado)
            VALUES (?, ?, ?, ?, NOW(), 'Pendiente')
        `;
        const [result] = await db.execute(query, [nombre, telefono, zona || '', detalles]);

        console.log(`⚠️ Nuevo reporte de avería: ${nombre} - ${detalles.substring(0, 30)}...`);
        res.status(201).json({ message: 'Reporte de avería guardado', id: result.insertId });
    } catch (error) {
        console.error('Error al guardar avería:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Health Check
app.get('/', (req, res) => {
    res.send('Americable API Running 🚀');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
