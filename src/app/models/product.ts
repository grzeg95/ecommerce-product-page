export type Product = {
  id: number,
  company: string,
  name: string,
  description: string,
  pricePlan: {
    price: number,
    discount: number
  },
  images: {
    normal: string[],
    thumb: string[]
  }
}
