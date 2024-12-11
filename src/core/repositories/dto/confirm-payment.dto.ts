import { Payment } from '../../domain/payment'
import { User } from '../../../types/payments.types'

export class ConfirmPaymentDto {
  constructor(
    readonly payment: Payment,
    readonly subscriber: User,
  ) {}
}
