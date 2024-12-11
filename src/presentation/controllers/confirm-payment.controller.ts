import { inject, injectable } from 'inversify'
import { Request, Response } from 'express'
import { ConfirmPaymentUseCase } from '../../core/usecases/confirm-payment.usecase'
import { RequestBody } from '../../types/payments.types'

@injectable()
export class ConfirmPaymentController {
  constructor(
    @inject(ConfirmPaymentUseCase)
    private confirmPaymentUseCase: ConfirmPaymentUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { from, successful_payment } = req.body as RequestBody

    try {
      console.log('req body', req.body)
      await this.confirmPaymentUseCase.execute({
        subscriber: from,
        payment: successful_payment,
      })

      res.status(200).json({ message: 'Payment confirmed.' })
    } catch (error) {
      if (error instanceof Error) {
        console.log('ERROR_PAYMENT_CHECK', error)
        res.status(404).send(error.message)
      }
    }
  }
}
