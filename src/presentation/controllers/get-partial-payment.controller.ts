import { inject, injectable } from 'inversify'
import { Request, Response } from 'express'
import { GetPartialPaymentUseCase } from '../../core/usecases/get-partial-payment.usecase'
import { IGetPartialPaymentRequestBody } from '../../types/get-partial-payment.types'
import { Payment } from '../../core/domain/payment'

@injectable()
export class GetPartialPaymentController {
  constructor(
    @inject(GetPartialPaymentUseCase)
    private useCase: GetPartialPaymentUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { fields_select, user_id } =
      req.query as unknown as IGetPartialPaymentRequestBody

    const fields = fields_select.split(',') as unknown as Array<keyof Payment>

    try {
      const payment = await this.useCase.execute({
        fields_select: fields,
        field_path: 'user_id',
        value: Number(user_id),
      })

      res.status(200).json(payment)
    } catch (error) {
      if (error instanceof Error) {
        console.log('ERROR_GET_PAYMENT', error)
        res.status(404).send(error.message)
      }
    }
  }
}
