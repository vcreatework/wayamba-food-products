export interface Variant { name: string; note?: string }

export interface Product {
  slug: string;
  name: string;
  localName?: string;
  category: string;
  shape?: string;
  palette?: [string, string];
  featured?: boolean;
  tagline?: string;
  description?: string;
  origin?: string;
  forms?: string[];
  variants?: Variant[];
  packSizes?: string[];
  moq?: string;
  shelfLife?: string;
  certifications?: string[];
  uses?: string[];
  image?: string;
  video?: string;
}
