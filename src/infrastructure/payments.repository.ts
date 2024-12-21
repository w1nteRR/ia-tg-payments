import { inject, injectable } from 'inversify'
import { IPaymentsRepository } from '../core/repositories/payments.repository'
import { CheckPaymentDto } from '../core/repositories/dto/check-payment.dto'
import { SubscribersServiceApi } from './subscribers-service.api'
import { ConfirmPaymentDto } from '../core/repositories/dto/confirm-payment.dto'
import { PaymentsFirestore } from './payments.firestore'
import { GetPaymentDto } from '../core/repositories/dto/get-payment.dto'
import { Payment } from '../core/domain/payment'
import { DeletePaymentDto } from '../core/repositories/dto/delete-payment.dto'
import { FindPaymentDto } from '../core/repositories/dto/find-payment-by-field.dto'
import { UpdatePaymentDto } from '../core/repositories/dto/update-payment.dto'

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

  async getPartialPayment(
    dto: GetPaymentDto,
  ): Promise<Partial<Payment> | null> {
    return await this.paymentsFirestore.findPaymentByField(dto)
  }

  async deletePayment(dto: DeletePaymentDto): Promise<void> {
    await this.paymentsFirestore.deletePayment(dto)
  }

  async findPayment(dto: FindPaymentDto): Promise<Payment | null> {
    return await this.paymentsFirestore.findPayment(dto)
  }

  async updatePayment(dto: UpdatePaymentDto): Promise<void> {
    await this.paymentsFirestore.updatePayment(dto)
  }
}
