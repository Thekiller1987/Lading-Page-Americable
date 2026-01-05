CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    telefono_whatsapp VARCHAR(20) NOT NULL,
    barrio_direccion TEXT,
    mensaje TEXT,
    fecha_contacto DATETIME DEFAULT CURRENT_TIMESTAMP,
    atendido BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS averias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    telefono_contacto VARCHAR(20) NOT NULL,
    zona_barrio VARCHAR(255),
    detalles_averia TEXT NOT NULL,
    fecha_reporte DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'Pendiente'
);
