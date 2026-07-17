export type ProductType = "poster" | "sticker"

export interface ProductSize {
  label: string
  dimensions: string
  price: number
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  product_type: ProductType
  category: string
  image_url: string
  images: string[]
  sizes: ProductSize[]
  material: string | null
  is_featured: boolean
  is_bestseller: boolean
  stock: number
  rating: number
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  type: ProductType
  created_at: string
}

export interface CartItem {
  productId: string
  slug: string
  name: string
  price: number
  quantity: number
  size: string
  image_url: string
  product_type: ProductType
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"
export type PaymentStatus = "unpaid" | "paid" | "refunded" | "failed"
export type PaymentMethod = "cod" | "paymee" | "flouci" | "stripe"

export interface Order {
  id: string
  user_id: string | null
  customer_name: string
  phone: string
  email: string
  address: string
  city: string
  governorate: string
  notes: string | null
  subtotal: number
  shipping: number
  total: number
  payment_method: PaymentMethod
  payment_status: PaymentStatus
  status: OrderStatus
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  price: number
  quantity: number
  size: string | null
  image_url: string | null
}

export interface Review {
  id: string
  product_id: string
  user_id: string | null
  author_name: string
  rating: number
  comment: string
  created_at: string
}

export interface CustomRequest {
  id: string
  user_id: string | null
  name: string
  email: string
  phone: string
  product_type: ProductType
  size: string
  frame_option: string | null
  image_url: string | null
  notes: string | null
  estimated_price: number | null
  status: string
  created_at: string
}
