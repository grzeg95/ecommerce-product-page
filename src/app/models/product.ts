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

export type ProductCart = {
  id: number,
  quantity: number
  name: string,
  image: string,
  pricePlan: {
    price: number,
    discount: number
  },
};
