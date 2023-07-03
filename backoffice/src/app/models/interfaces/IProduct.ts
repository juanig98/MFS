interface IImage {
    id: number;
    filename: string;
    type: string;
    description: string;
    path: string;
}
interface ISize {
    id: number;
    title: string;
    description: string;
    abbreviation: string;
    type: string;
    maximum: number;
    minimum: number;
    suffix: string;
    prefix: string;
    observations: string;
}
interface ICategory {
    id: number;
    description: string;
    slug: string;
    observations: string;
}
interface IProductImage {
    productId: number;
    imageId: number;
    observations: string;
    image: IImage
}
interface IProductCategory {
    productId: number;
    categoryId: number;
    observations: string;
    category: ICategory;
}
interface IProductSize {
    productId: number;
    sizeId: number;
    value: number;
    quantity: number;
    observations: string;
    size: ISize;
}
export interface IProduct {
    id: number;
    title: string;
    slug: string;
    description: string;
    priceCost: number;
    pricePublic: number;
    observations: string;
    images: IProductImage[];
    sizes: IProductSize[];
    categories: IProductCategory[];
}