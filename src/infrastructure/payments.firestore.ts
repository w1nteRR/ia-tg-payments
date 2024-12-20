import { Firestore } from '@google-cloud/firestore'
import { injectable } from 'inversify'

import firestoreConfig from '../configs/firestore.config'
import { Payment } from '../core/domain/payment'
import { GetPaymentDto } from '../core/repositories/dto/get-payment.dto'

const db = new Firestore(firestoreConfig)

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
    await this.collection.doc().set({ ...payment })
  }
}
