export type CouponsResponseType = {
  _id: string;
  code: string;
  discountType: string;
  maxDiscount: number;
  minOrder: number;
  validFrom: string;
  validTo: string;
  active: boolean;
  description: string;
  maxAllowed: number;
  usedBy: number;
  forUser: Array<string>;
  eliminateCharges: any;
  createdAt: string;
  __v: number;
};
