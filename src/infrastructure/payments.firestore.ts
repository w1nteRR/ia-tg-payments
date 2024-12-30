import { Firestore } from '@google-cloud/firestore'
import { injectable } from 'inversify'

import { Payment } from '../core/domain/payment'
import { GetPaymentDto } from '../core/repositories/dto/get-payment.dto'
import { FindPaymentDto } from '../core/repositories/dto/find-payment-by-field.dto'
import { UpdatePaymentDto } from '../core/repositories/dto/update-payment.dto'
import { DeletePaymentDto } from '../core/repositories/dto/delete-payment.dto'

const db = new Firestore()

@injectable()
export class PaymentsFirestore {
  protected collection: FirebaseFirestore.CollectionReference

  constructor() {
    this.collection = db.collection('payments')
  }

  async findPaymentByField(
    dto: GetPaymentDto,
  ): Promise<Partial<Payment> | null> {
    const snapshot = await this.collection
      .where(dto.field_path, '==', dto.value)
      .select(...dto.fields_select)
      .get()

    if (snapshot.empty) {
      console.log('No matching payment found.')

      return null
    }

    const paymentDoc = snapshot.docs[0]
    return paymentDoc.data() as Partial<Payment>
  }

  async savePayment(payment: Payment): Promise<void> {
    await this.collection.doc(String(payment.user_id)).set({ ...payment })
  }

  async findPayment(dto: FindPaymentDto): Promise<Payment | null> {
    const paymentRef = await this.collection.doc(String(dto.user_id))
    const doc = await paymentRef.get()

    if (!doc.exists) return null

    return doc.data() as Payment
  }

  async updatePayment(dto: UpdatePaymentDto): Promise<void> {
    const paymentRef = await this.collection.doc(String(dto.user_id))

    await paymentRef.update({ ...dto.payment })
  }

  async deletePayment(dto: DeletePaymentDto): Promise<void> {
    await this.collection.doc(String(dto.user_id)).delete()
  }
}
