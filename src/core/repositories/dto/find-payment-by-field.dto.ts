import { Payment } from '../../domain/payment'

export class FindPaymentByFieldDto {
  constructor(
    readonly field_path: keyof Payment,
    readonly value: string,
  ) {}
}
