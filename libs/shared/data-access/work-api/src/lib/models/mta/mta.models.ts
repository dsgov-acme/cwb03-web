export interface CommonAddress {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateCode?: string;
  postalCode?: string;
  postalCodeExtension?: string;
  countryCode?: string;
}

export interface MTALocation {
  id?: string;
  name?: string;
  locationType?: LocationType;
  latitude?: number;
  longitude?: number;
  address?: CommonAddress;
}

export enum LocationType {
  SavedLocation = 'SAVED_LOCATION',
  CustomLocation = 'CUSTOM_LOCATION',
}

export enum AnchorType {
  PICKUP = 'PICKUP',
  DROPOFF = 'DROPOFF',
}

export interface PassengerAccomodations {
  ambulatorySeats?: number;
  wheelchairSeats?: number;
  companions?: number;
}

export interface PromiseTime {
  id?: string;
  pickupTime?: number;
  dropTime?: number;
  route?: string;
}

export interface PromiseTimeResponse {
  anchor?: AnchorType;
  riderId?: string;
  promises?: PromiseTime[];
}

export interface PromiseTimeRequest {
  anchor?: AnchorType;
  riderId?: string;
  pickupPlaceId?: string;
  dropPlaceId?: string;
  passengerAccommodations?: PassengerAccomodations;
  requestTime?: number;
}

export interface SubmitReservationRequest {
  id?: string; // id of the promise time
}

export interface ReservationDetailsRequest {
  id?: string; // id of the promise time
}

export interface ReservationDetailsResponse {
  id?: string;
  anchor?: AnchorType;
  requestTime?: number;
  pickup?: ReservationDetailsAnchor;
  dropOff?: ReservationDetailsAnchor;
  passengerAccomodations?: PassengerAccomodations;
  route?: string;
}

export interface ReservationDetailsAnchor {
  placeId?: string;
  promiseTime?: number;
}
