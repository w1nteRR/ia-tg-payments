import { Container } from 'inversify'
import { SubscribersServiceApi } from '../infrastructure/subscribers-service.api'
import { PaymentsRepository } from '../infrastructure/payments.repository'
import { CheckPaymentUseCase } from '../core/usecases/check-payment.usecase'
import { CheckPaymentController } from '../presentation/controllers/check-payment.controller'
import { ConfirmPaymentUseCase } from '../core/usecases/confirm-payment.usecase'
import { PaymentsFirestore } from '../infrastructure/payments.firestore'
import { ConfirmPaymentController } from '../presentation/controllers/confirm-payment.controller'

const container = new Container()

container.bind(PaymentsFirestore).toSelf().inSingletonScope()
container.bind(SubscribersServiceApi).toSelf().inSingletonScope()
container.bind(PaymentsRepository).toSelf().inSingletonScope()
container.bind(CheckPaymentUseCase).toSelf().inSingletonScope()
container.bind(CheckPaymentController).toSelf().inSingletonScope()
container.bind(ConfirmPaymentUseCase).toSelf().inSingletonScope()
container.bind(ConfirmPaymentController).toSelf().inSingletonScope()
// container.bind(VerifyOrderController).toSelf().inSingletonScope()
// container.bind(PubSubRepository).toSelf().inSingletonScope()

export { container }
