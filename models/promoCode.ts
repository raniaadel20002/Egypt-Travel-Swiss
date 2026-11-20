export interface PromoCodeItem {
  id: number;
  code: number;
  discountEuro: number;
  discountpercent: number;
  limited: number;
  tripId: number;
  tripName: string | null;
  tripType: string | null;
  priceForChild: number;
  priceForAdult: number;
  createdAt: string | null;
  createdBy: string | null;
  isActived?: boolean;
}

export interface PromoCodesQueryParams {
  PageNumber?: number;
  PageSize?: number;
}

export interface CreatePromoCodePayload {
  discountEuro?: number | null;
  discountpercent?: number | null;
  limited: number;
  tripId?: number | null;
}

export interface CreatePromoCodeResult {
  id: number;
  code: number;
}
