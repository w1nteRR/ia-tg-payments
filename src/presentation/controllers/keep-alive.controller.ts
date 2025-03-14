import { injectable } from 'inversify'
import { Request, Response } from 'express'

@injectable()
export class KeepAliveController {
  public async handle(req: Request, res: Response): Promise<void> {
    res.status(200).json({ status: 'keep-alive-payments' })
  }
}
