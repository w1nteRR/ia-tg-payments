import { Payment } from '../../domain/payment'

export class GetPaymentDto {
  constructor(
    readonly field_path: keyof Payment,
    readonly value: string | number,
    readonly fields_select: Array<keyof Payment>,
  ) {}
}
