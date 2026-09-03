export interface Recipe {
  _id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}
