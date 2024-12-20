import { inject, injectable } from 'inversify'
import { Payment } from '../domain/payment'
import { PaymentsRepository } from '../../infrastructure/payments.repository'
import { GetPaymentDto } from '../repositories/dto/get-payment.dto'

@injectable()
export class GetPartialPaymentUseCase {
  constructor(
    @inject(PaymentsRepository) private paymentsRepository: PaymentsRepository,
  ) {}

  public async execute(dto: GetPaymentDto): Promise<Partial<Payment> | null> {
    const payment = await this.paymentsRepository.getPartialPayment(dto)

    if (!payment) return null

    return payment
  }
}
