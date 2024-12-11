import { CheckPaymentDto } from './dto/check-payment.dto'
import { ConfirmPaymentDto } from './dto/confirm-payment.dto'

export interface IPaymentsRepository {
  checkPayment: (dto: CheckPaymentDto) => Promise<boolean>
  confirmPayment: (dto: ConfirmPaymentDto) => Promise<void>
}
