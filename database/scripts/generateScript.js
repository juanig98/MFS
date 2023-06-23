const fs = require('fs');
const path = require('path');

// Ruta de la carpeta que contiene los archivos .sql
const folderPath = path.resolve(__dirname, "../migrations");

// Obtener la lista de archivos en la carpeta
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Error al leer la carpeta:', err);
        return;
    }

    // Filtrar solo los archivos .sql
    const sqlFiles = files.filter((file) => path.extname(file) === '.sql');

    // Leer el contenido de cada archivo y concatenarlo
    let combinedSql = '';
    sqlFiles.forEach((file, i) => {
        const filePath = path.join(folderPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        if (i != 0) combinedSql += "\n\n"
        combinedSql += `-- Archivo: ${file}\n${fileContent}`;
    });

    // Escribir el contenido combinado en un archivo único
    const outputPath = path.resolve(__dirname, "script.sql");
    fs.writeFileSync(outputPath, combinedSql, 'utf-8');

    console.log('Archivo generado con éxito:', outputPath);
});
