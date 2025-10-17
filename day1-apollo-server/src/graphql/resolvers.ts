import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// ----------------------
// Type definitions
// ----------------------

interface InventoryItem {
  id: string;
  name: string;
  category: string;  // category id
  supplier: string;  // supplier id
  costPrice: number;
  sellingPrice: number;
  quantity: number;
}

interface Category {
  id: string;
  name: string;
}

interface Supplier {
  id: string;
  name: string;
}

interface GetInventoryItemInput {
  id?: string;
  name?: string;
}

interface CreateInventoryItemInput {
  name: string;
  category: string;
  supplier: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
}

// ----------------------
// Utility functions
// ----------------------

const readJson = <T>(filename: string): T[] => {
  const data = fs.readFileSync(`./data/${filename}`, 'utf-8');
  return JSON.parse(data) as T[];
};

const writeJson = <T>(filename: string, data: T[]): void => {
  fs.writeFileSync(`./data/${filename}`, JSON.stringify(data, null, 2));
};

// ----------------------
// GraphQL Resolvers
// ----------------------

export const resolvers = {

  InventoryItem: {
    category: (parent: InventoryItem): Category | undefined => {
      const categories = readJson<Category>('categories.json');
      return categories.find((c) => c.id === parent.category);
    },

    supplier: (parent: InventoryItem): Supplier | undefined => {
      const suppliers = readJson<Supplier>('suppliers.json');
      return suppliers.find((s) => s.id === parent.supplier);
    },
  },


  Query: {
    inventoryItems: (): InventoryItem[] => readJson<InventoryItem>('inventoryItems.json'),

    inventoryItem: (
      _: unknown,
      { input }: { input: GetInventoryItemInput }
    ): InventoryItem | null => {
      const items = readJson<InventoryItem>('inventoryItems.json');
      if (input.id) return items.find((i) => i.id === input.id) || null;
      if (input.name) return items.find((i) => i.name === input.name) || null;
      return null;
    },
  },

  Mutation: {
    newInventoryItem: (
      _: unknown,
      { input }: { input: CreateInventoryItemInput }
    ): InventoryItem => {
      // Load current data
      const items = readJson<InventoryItem>('inventoryItems.json');
      const categories = readJson<Category>('categories.json');
      const suppliers = readJson<Supplier>('suppliers.json');

      // Check if category exists
      const categoryExists = categories.some((c) => c.id === input.category);
      if (!categoryExists) {
        throw new Error(`Category with id '${input.category}' does not exist.`);
      }

      // Check if supplier exists
      const supplierExists = suppliers.some((s) => s.id === input.supplier);
      if (!supplierExists) {
        throw new Error(`Supplier with id '${input.supplier}' does not exist.`);
      }

      // Create new item
      const newItem: InventoryItem = {
        id: uuidv4(),
        ...input,
      };

      // Save
      items.push(newItem);
      writeJson('inventoryItems.json', items);

      return newItem;
    },
  },

};
