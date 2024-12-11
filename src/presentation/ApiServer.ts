import express from 'express'
import cors from 'cors'

import { CheckPaymentController } from './controllers/check-payment.controller'
import { ConfirmPaymentController } from './controllers/confirm-payment.controller'

const app = express()
app.use(express.json())
app.use(cors())

export class ApiServer {
  public static async run(
    port: number,
    checkPaymentController: CheckPaymentController,
    confirmPaymentController: ConfirmPaymentController,
  ) {
    app.post('/check-payment', (req, res) =>
      checkPaymentController.handle(req, res),
    )

    app.post('/confirm-payment', (req, res) =>
      confirmPaymentController.handle(req, res),
    )

    app.listen(port, () => console.log(`server is running, ${port}`))
  }
}
