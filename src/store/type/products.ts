import { ProductModel } from '@/model/product-model'

interface Page<T> {
  [index: number]: T[];
}

export type ProductsState = {
  currentPage: number;
  pageSize: number;
  totalVisible: number;
  pages: Page<ProductModel>;
  serverPageCount: number;
  showSearch: boolean;
  searchTerm: string;
}
