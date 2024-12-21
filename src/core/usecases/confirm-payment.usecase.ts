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
    const { payment, subscriber } = dto

    const foundPayment = await this.paymentsRepository.findPayment({
      user_id: subscriber.id,
    })

    if (foundPayment === null) {
      await this.paymentsRepository.confirmPayment(dto)
    } else {
      await this.paymentsRepository.updatePayment({
        user_id: subscriber.id,
        payment: { ...payment },
      })
    }
  }
}
