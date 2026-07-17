"use client";

import type { CartItem, Order, OrderItem, PaymentMethod } from "@/lib/types";

const ORDERS_KEY = "stikky_orders_v1";
const PROFILE_KEY = "stikky_profile_v1";

export interface LocalOrder extends Order {
  items: OrderItem[];
}

export interface LocalProfile {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  governorate: string;
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getOrders(): LocalOrder[] {
  return readJSON<LocalOrder[]>(ORDERS_KEY, []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function createOrder(input: {
  customer: Omit<LocalProfile, "email"> & { email: string };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  payment_method: PaymentMethod;
  notes?: string;
}): LocalOrder {
  const id = `ST-${Date.now().toString(36).toUpperCase()}`;
  const order: LocalOrder = {
    id,
    user_id: null,
    customer_name: input.customer.full_name,
    phone: input.customer.phone,
    email: input.customer.email,
    address: input.customer.address,
    city: input.customer.city,
    governorate: input.customer.governorate,
    notes: input.notes ?? null,
    subtotal: input.subtotal,
    shipping: input.shipping,
    total: input.total,
    payment_method: input.payment_method,
    payment_status: input.payment_method === "cod" ? "unpaid" : "paid",
    status: "pending",
    created_at: new Date().toISOString(),
    items: input.items.map((i, idx) => ({
      id: `${id}-${idx}`,
      order_id: id,
      product_id: i.productId,
      product_name: i.name,
      price: i.price,
      quantity: i.quantity,
      size: i.size,
      image_url: i.image_url,
    })),
  };
  const existing = getOrders();
  writeJSON(ORDERS_KEY, [order, ...existing]);
  return order;
}

export function getProfile(): LocalProfile | null {
  return readJSON<LocalProfile | null>(PROFILE_KEY, null);
}

export function saveProfile(profile: LocalProfile) {
  writeJSON(PROFILE_KEY, profile);
}
