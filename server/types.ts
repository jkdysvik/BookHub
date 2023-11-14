import type { Document } from "mongoose";

export interface BookType extends Document {
  _id: string;
  title: string;
  author: string;
  year: number;
  rating: number;
  genre: string;
  description: string;
  pages: number;
  language: string;
}

export interface CreateBookInput {
  title: string;
  author: string; 
  year: number;
  rating: number;
  genre: string;
  description: string;
  pages: number;
  language: string;
}
