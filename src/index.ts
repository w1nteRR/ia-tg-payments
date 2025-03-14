import 'reflect-metadata'
import dotenv from 'dotenv'
import { container } from './di/payments.container'
import { CheckPaymentController } from './presentation/controllers/check-payment.controller'
import { ApiServer } from './presentation/ApiServer'
import { ConfirmPaymentController } from './presentation/controllers/confirm-payment.controller'
import { GetPartialPaymentController } from './presentation/controllers/get-partial-payment.controller'
import { KeepAliveController } from './presentation/controllers/keep-alive.controller'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

const port = Number(process.env.PORT) || 3000

const checkPaymentController = container.get(CheckPaymentController)
const confirmPaymentController = container.get(ConfirmPaymentController)
const getPartialPaymentController = container.get(GetPartialPaymentController)
const keepAliveController = container.get(KeepAliveController)

const start = async () => {
  await ApiServer.run(
    port,
    checkPaymentController,
    confirmPaymentController,
    getPartialPaymentController,
    keepAliveController,
  )
}

void start()
