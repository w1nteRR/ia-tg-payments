export class Payment {
  constructor(
    readonly currency: string,
    readonly total_amount: number,
    readonly invoice_payload: string,
    readonly subscription_expiration_date: number,
    readonly is_recurring: boolean,
    readonly is_first_recurring: boolean,
    readonly shipping_option_id: string,
    readonly telegram_payment_charge_id: string,
    readonly provider_payment_charge_id: string,
    readonly user_id: number,
  ) {}
}
