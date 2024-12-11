import { inject, injectable } from 'inversify'
import { IPaymentsRepository } from '../core/repositories/payments.repository'
import { CheckPaymentDto } from '../core/repositories/dto/check-payment.dto'
import { SubscribersServiceApi } from './subscribers-service.api'
import { ConfirmPaymentDto } from '../core/repositories/dto/confirm-payment.dto'
import { PaymentsFirestore } from './payments.firestore'

@injectable()
export class PaymentsRepository implements IPaymentsRepository {
  constructor(
    @inject(SubscribersServiceApi)
    private subscribersServiceApi: SubscribersServiceApi,
    @inject(PaymentsFirestore) private paymentsFirestore: PaymentsFirestore,
  ) {}

  async checkPayment(dto: CheckPaymentDto): Promise<boolean> {
    return await this.subscribersServiceApi.checkSubscriber(dto)
  }
  async confirmPayment(dto: ConfirmPaymentDto): Promise<void> {
    await this.paymentsFirestore.savePayment({
      ...dto.payment,
      user_id: dto.subscriber.id,
    })
    await this.subscribersServiceApi.saveSubscriber(dto)
  }
}
