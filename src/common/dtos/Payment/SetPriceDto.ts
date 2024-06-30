import { PaymentType } from "../../enums/Payment";

export interface SetPriceDto {
  price: number;
  paymentType: PaymentType | null;
}