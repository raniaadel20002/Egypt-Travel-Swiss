import {
  TransferLocationLocalizedName,
  TRANSFER_LOCATION_LANGUAGES,
} from "./transferLocation";

export { TRANSFER_LOCATION_LANGUAGES };
export type { TransferLocationLocalizedName };

export type TransferServiceTab = "from" | "to" | "vehicles" | "prices";

export interface VehicleTypeTransferApiItem {
  id: string;
  name: string;
  fromPerson: number;
  toPerson: number;
  additionalHoursUsd: number;
  discountPercentage: number;
}

export interface CreateVehicleTypeTransferPayload {
  name: TransferLocationLocalizedName;
  fromPerson: number;
  toPerson: number;
  additionalHoursUsd: number;
  discountPercentage: number;
}

export interface UpdateVehicleTypeTransferPayload
  extends CreateVehicleTypeTransferPayload {
  id: string;
}

export interface VehicleTypeTransferMultiLangDetails {
  id: string;
  name: TransferLocationLocalizedName;
  fromPerson: number;
  toPerson: number;
  additionalHoursUsd: number;
  discountPercentage: number;
}

export interface TransferVehiclePriceApiItem {
  id: string;
  vehicleTypeTransferId: string;
  vehicleName: string;
  fromId: string;
  fromLocation: string;
  toId: string;
  toLocation: string;
  priceUsd: number;
}

export interface CreateTransferVehiclePricePayload {
  vehicleTypeTransferId: string;
  fromId: string;
  toId: string;
  priceUsd: number;
}

export interface UpdateTransferVehiclePricePayload
  extends CreateTransferVehiclePricePayload {
  id: string;
}

export interface TransferServiceQueryParams {
  PageNumber?: number;
  PageSize?: number;
  language?: string;
}
