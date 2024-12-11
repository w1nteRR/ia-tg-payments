import { inject, injectable } from 'inversify'
import { CheckPaymentDto } from '../repositories/dto/check-payment.dto'
import { PaymentsRepository } from '../../infrastructure/payments.repository'

@injectable()
export class CheckPaymentUseCase {
  constructor(
    @inject(PaymentsRepository)
    private paymentsRepository: PaymentsRepository,
  ) {}

  public async execute(dto: CheckPaymentDto): Promise<boolean> {
    return await this.paymentsRepository.checkPayment(dto)
  }
}
