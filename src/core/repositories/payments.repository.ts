import { CheckPaymentDto } from './dto/check-payment.dto'
import { ConfirmPaymentDto } from './dto/confirm-payment.dto'
import { Payment } from '../domain/payment'
import { GetPaymentDto } from './dto/get-payment.dto'

export interface IPaymentsRepository {
  checkPayment: (dto: CheckPaymentDto) => Promise<boolean>
  confirmPayment: (dto: ConfirmPaymentDto) => Promise<void>
  getPartialPayment: (dto: GetPaymentDto) => Promise<Partial<Payment> | null>
}
