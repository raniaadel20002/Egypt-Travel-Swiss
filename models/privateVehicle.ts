import { BackendLanguageCode } from "@/models/tripType";

export interface PrivateVehicleLocalizedName {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

export interface PrivateVehicleApiItem {
  id: number;
  name: string;
}

export interface PrivateVehicleMultiLangDetails {
  id: number;
  name: PrivateVehicleLocalizedName;
}

export interface PrivateVehiclesQueryParams {
  PageNumber?: number;
  PageSize?: number;
  searchTerm?: string;
  language?: BackendLanguageCode;
}

export interface CreatePrivateVehiclePayload {
  name: PrivateVehicleLocalizedName;
}

export interface UpdatePrivateVehiclePayload {
  id: number;
  name: PrivateVehicleLocalizedName;
}

export interface PrivateVehicleTransferApiItem {
  id: number;
  tripId: number;
  tripName: string;
  privateVehicleId: number;
  vehicleName: string;
  from: number;
  to: number;
  price: number;
}

export interface PrivateVehicleTransferMatchItem {
  id: number;
  tripId: number;
  privateVehicleId: number;
  vehicleName: string;
  from: number;
  to: number;
  price: number;
}

export interface PrivateVehicleTransfersQueryParams {
  PageNumber?: number;
  PageSize?: number;
  tripId?: number;
  vehicleId?: number;
  language?: BackendLanguageCode;
}

export interface CreatePrivateVehicleTransferPayload {
  tripId: number;
  privateVehicleId: number;
  from: number;
  to: number;
  price: number;
}

export interface UpdatePrivateVehicleTransferPayload {
  id: number;
  tripId: number;
  privateVehicleId: number;
  from: number;
  to: number;
  price: number;
}
