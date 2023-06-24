#!/bin/bash

# dirProyects=$PWD  # Reemplaza con la ruta al directorio raíz de tus proyectos

# Obtén la lista de carpetas de proyectos
projects=$(find "$PWD" -maxdepth 1 -type d -exec basename {} \;)

# Itera sobre cada carpeta de proyecto y ejecuta npm install
for folder in $projects; do
    project_path="$PWD/$folder"
    package_json_path="$project_path/package.json"

    # Verifica si el archivo package.json existe en el directorio actual
    if [ -f "$package_json_path" ]; then
        echo "Instalando dependencias en $folder..."
        (cd "$project_path" && npm install)
    fi
done
