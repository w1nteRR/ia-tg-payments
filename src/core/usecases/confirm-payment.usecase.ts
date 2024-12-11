import { inject, injectable } from 'inversify'
import { ConfirmPaymentDto } from '../repositories/dto/confirm-payment.dto'
import { PaymentsRepository } from '../../infrastructure/payments.repository'

@injectable()
export class ConfirmPaymentUseCase {
  constructor(
    @inject(PaymentsRepository)
    private paymentsRepository: PaymentsRepository,
  ) {}
  public async execute(dto: ConfirmPaymentDto): Promise<void> {
    await this.paymentsRepository.confirmPayment(dto)
  }
}
