import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [['price', 'DESC']]
        });
        console.log(products);
        res.json({ data : products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving products' });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return 
        }

        res.json({ data : product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving product' });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.json({ data: product, message: 'Product created successfully!' });
    } catch (error) {
        console.log(error)
    }
};

export const updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return 
        }

        await product.update(req.body);
        await product.save();
        res.json({ data : product });

}

export const updateAvailability = async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return 
        }

        product.availability = !product.dataValues.availability;
        await product.save();
        res.json({ data : product });
}

export const deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return 
        }

        await product.destroy();
        res.json({ message: 'Product deleted successfully!' });
}
