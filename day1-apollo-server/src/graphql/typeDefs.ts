
const typeDefs =`#graphql

  type Category {
    id: ID!
    name: String!
    inventoryItems: [InventoryItem!]
  }

  type Supplier {
    id: ID!
    name: String!
    inventoryItems: [InventoryItem!]
  }

  type InventoryItem {
    id: ID!
    name: String!
    category: Category!
    supplier: Supplier!
    costPrice: Float! @deprecated(reason: "Use sellingPrice instead")
    sellingPrice: Float!
    quantity: Int!
  }

  input getInventoryItemInput {
    id: ID
    name: String
  }

  input CreateInventoryItemInput {
    id: String!
    name: String!
    category: String!
    supplier: String!
    costPrice: Float!
    sellingPrice: Float!
    quantity: Int!
 }

  type Query {
    inventoryItem(input: getInventoryItemInput): InventoryItem
    inventoryItems: [InventoryItem!]!
  }

  type Mutation {
    newInventoryItem(
      input: CreateInventoryItemInput!
    ): InventoryItem
  }
`;

export default typeDefs;
