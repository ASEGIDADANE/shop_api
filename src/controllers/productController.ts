import { Request, Response } from "express";
import { createProduct, deleteproduct, getallproduct, updateproduct } from "../services/productService";
import { productSchemaZod } from "../models/productModel";
import { z } from 'zod';

const createProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input data using zod schema
    const productData = productSchemaZod.parse(req.body);
    const newProduct = await createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Validation error", errors: error.errors });
    } else {
      res.status(500).json({ message: "Error creating product", error: (error as Error).message });
    }
  }
};

const getAllProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getallproduct();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error getting products", error: (error as Error).message });
  }
};

const updateProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // Validate input data using zod schema
    const productData = productSchemaZod.parse(req.body);
    const updatedProduct = await updateproduct(id, productData);
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Validation error", errors: error.errors });
    } else {
      res.status(500).json({ message: "Error updating product", error: (error as Error).message });
    }
  }
};

const deleteProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteproduct(id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: (error as Error).message });
  }
};

export { createProductController, getAllProductController, updateProductController, deleteProductController };