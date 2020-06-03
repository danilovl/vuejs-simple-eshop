import { ProductModel } from '@/model/product-model'

export class BasketModel {
  constructor (
    public product: ProductModel,
    public quantity: number
  ) {}

  public getTotalPrice (): number {
    return this.product.price * this.quantity
  }
}
