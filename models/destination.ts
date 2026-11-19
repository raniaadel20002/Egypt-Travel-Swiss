import { BackendLanguageCode } from "@/models/tripType";

/**
 * Client-facing destination card interface (used by client routes)
 */
export interface DestinationItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

/**
 * Backend destination entity returned by /api/Destinations
 */
export interface DestinationApiItem {
  id: number;
  name: string;
  imageUrl: string;
  isFeatured: boolean;
  tripsCount: number;
}

/**
 * Localized destination names across 5 supported languages
 */
export interface DestinationLocalizedNames {
  En: string;
  Fr: string;
  Ru: string;
  Ro: string;
  It: string;
}

/**
 * Composite multi-language destination details for Admin editing
 */
export interface DestinationMultiLangDetails {
  id: number;
  imageUrl: string;
  isFeatured: boolean;
  tripsCount: number;
  names: DestinationLocalizedNames;
}

/**
 * Query parameters for GET /api/Destinations
 */
export interface DestinationsQueryParams {
  PageNumber?: number;
  PageSize?: number;
  searchTerm?: string;
  language?: BackendLanguageCode;
}

/**
 * Payload for POST /api/Destinations
 */
export interface CreateDestinationPayload {
  names: DestinationLocalizedNames;
  isFeatured: boolean;
  imageFile: File;
}

/**
 * Payload for PUT /api/Destinations
 */
export interface UpdateDestinationPayload {
  id: number;
  names: DestinationLocalizedNames;
  isFeatured: boolean;
  imageFile?: File | null;
}

/**
 * Payload for PUT /api/Destinations/{id}/image
 */
export interface UpdateDestinationImagePayload {
  id: number;
  imageFile: File;
}
