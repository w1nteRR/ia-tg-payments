import { Payment } from '../core/domain/payment'

export interface PreCheckoutQuery {
  id: string
  from: User
  currency: string
  total_amount: number
  invoice_payload: string
  shipping_option_id?: string | undefined
  order_info?: OrderInfo | undefined
}

export interface User {
  id: number
  is_bot: boolean
  first_name: string
  last_name?: string | undefined
  username?: string | undefined
  language_code?: string | undefined
}

interface OrderInfo {
  name?: string | undefined
  phone_number?: string | undefined
  email?: string | undefined
}

interface SuccessfulPayment {
  currency: string
  total_amount: number
  invoice_payload: string
  telegram_payment_charge_id: string
  provider_payment_charge_id: string
  is_recurring: true
  is_first_recurring: true
  subscription_expiration_date: 1736465415
}

export interface RequestBody {
  from: User
  successful_payment: Payment
  date: number
}
