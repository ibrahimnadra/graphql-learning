import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
// ----------------------
// Utility functions
// ----------------------
const readJson = (filename) => {
    const data = fs.readFileSync(`./data/${filename}`, 'utf-8');
    return JSON.parse(data);
};
const writeJson = (filename, data) => {
    fs.writeFileSync(`./data/${filename}`, JSON.stringify(data, null, 2));
};
// ----------------------
// GraphQL Resolvers
// ----------------------
export const resolvers = {
    InventoryItem: {
        category: (parent) => {
            const categories = readJson('categories.json');
            return categories.find((c) => c.id === parent.category);
        },
        supplier: (parent) => {
            const suppliers = readJson('suppliers.json');
            return suppliers.find((s) => s.id === parent.supplier);
        },
    },
    Query: {
        inventoryItems: () => readJson('inventoryItems.json'),
        inventoryItem: (_, { input }) => {
            const items = readJson('inventoryItems.json');
            if (input.id)
                return items.find((i) => i.id === input.id) || null;
            if (input.name)
                return items.find((i) => i.name === input.name) || null;
            return null;
        },
    },
    Mutation: {
        newInventoryItem: (_, { input }) => {
            // Load current data
            const items = readJson('inventoryItems.json');
            const categories = readJson('categories.json');
            const suppliers = readJson('suppliers.json');
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
            const newItem = {
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
