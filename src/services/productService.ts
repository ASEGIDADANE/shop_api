import product from '../models/productModel';
import { Document } from 'mongoose';
import { IProductInput } from '../models/productModel';

const createProduct = async (data: IProductInput): Promise<Document> => {
  try {
    const { title, description, price, countInStock, category, image } = data;

    const existingProduct = await product.findOne({ title });
    if (existingProduct) {
      throw new Error(`Product with title ${title} already exists`);
    }

    const newProduct = new product({
      title,
      description,
      price,
      countInStock,
      category,
      image,
    });

    await newProduct.save();

    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const getallproduct = async (filters: Partial<IProductInput> = {}): Promise<Document[]> => {
  try {
    const query: any = {};

    if (filters.title) {
      query.title = { $regex: filters.title, $options: 'i' }; // Case-insensitive regex search
    }
    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.price) {
      query.price = filters.price;
    }
    if (filters.countInStock) {
      query.countInStock = filters.countInStock;
    }

    const products = await product.find(query);
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

const updateproduct = async (id: string, data: Partial<IProductInput>): Promise<Document | null> => {
  try {
    const updatedProduct = await product.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

const deleteproduct = async (id: string): Promise<Document | null> => {
  try {
    const deletedProduct = await product.findByIdAndDelete(id);
    return deletedProduct;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export { createProduct, getallproduct, updateproduct, deleteproduct };