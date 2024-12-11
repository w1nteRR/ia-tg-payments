import { Firestore } from '@google-cloud/firestore'
import { injectable } from 'inversify'

import firestoreConfig from '../configs/firestore.config'
import { Payment } from '../core/domain/payment'
import { FindPaymentByFieldDto } from '../core/repositories/dto/find-payment-by-field.dto'

const db = new Firestore(firestoreConfig)

@injectable()
export class PaymentsFirestore {
  protected collection: FirebaseFirestore.CollectionReference

  constructor() {
    this.collection = db.collection('payments')
  }

  async findPaymentByField(
    dto: FindPaymentByFieldDto,
  ): Promise<Payment | null> {
    const snapshot = await this.collection
      .where(dto.field_path, '==', dto.value)
      .get()

    if (snapshot.empty) {
      console.log('No matching payment found.')

      return null
    }

    const paymentDoc = snapshot.docs[0]

    return paymentDoc.data() as Payment
  }

  async savePayment(payment: Payment): Promise<void> {
    await this.collection.doc().set({ ...payment })
  }
}
