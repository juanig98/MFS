export class HelperService {
    createSlug(str: string): string {
        const slug = str
            .toLowerCase() // Convertir a minúsculas
            .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales
            .replace(/\s+/g, '-') // Reemplazar espacios en blanco con guiones
            .replace(/--+/g, '-') // Eliminar guiones duplicados
            .trim(); // Eliminar espacios en blanco al inicio y final

        return slug;
    }
}