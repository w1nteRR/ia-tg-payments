import { CheckPaymentDto } from './dto/check-payment.dto'
import { ConfirmPaymentDto } from './dto/confirm-payment.dto'
import { Payment } from '../domain/payment'
import { GetPaymentDto } from './dto/get-payment.dto'
import { FindPaymentDto } from './dto/find-payment-by-field.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import { DeletePaymentDto } from './dto/delete-payment.dto'

export interface IPaymentsRepository {
  checkPayment: (dto: CheckPaymentDto) => Promise<boolean>
  confirmPayment: (dto: ConfirmPaymentDto) => Promise<void>
  getPartialPayment: (dto: GetPaymentDto) => Promise<Partial<Payment> | null>
  findPayment: (dto: FindPaymentDto) => Promise<Payment | null>
  updatePayment: (dto: UpdatePaymentDto) => Promise<void>
  deletePayment: (dto: DeletePaymentDto) => Promise<void>
}
