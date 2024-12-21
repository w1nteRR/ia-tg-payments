import { Payment } from '../../domain/payment'

export class UpdatePaymentDto {
  constructor(
    readonly user_id: number,
    readonly payment: Partial<Payment>,
  ) {}
}
