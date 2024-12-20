import { inject, injectable } from 'inversify'
import { Request, Response } from 'express'
import { CheckPaymentUseCase } from '../../core/usecases/check-payment.usecase'
import { PreCheckoutQuery } from '../../types/payments.types'

@injectable()
export class CheckPaymentController {
  constructor(
    @inject(CheckPaymentUseCase)
    private useCase: CheckPaymentUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { from } = req.body as PreCheckoutQuery

    try {
      const result = await this.useCase.execute({ user_id: from.id })

      res.status(200).json({ is_already_subscriber: result })
    } catch (error) {
      if (error instanceof Error) {
        console.log('ERROR_PAYMENT_CHECK', error)
        res.status(404).send(error.message)
      }
    }
  }
}
