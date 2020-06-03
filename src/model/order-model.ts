import { BasketModel } from '@/model/basket-model'

export class OrderModel {
  constructor (
    public name: string,
    public email: string,
    public city: string,
    public address: string,
    public basket: BasketModel[],
    public processed: boolean = false,
    public readonly id?: number | null
  ) {}
}
