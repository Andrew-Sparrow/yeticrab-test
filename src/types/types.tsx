export interface IOrder {
  id: number;
  company: string;
  carrier_first_name: string;
  carrier_middle_name: string;
  carrier_last_name: string;
  date: string;
  phone: string;
  comment: string;
  ati: string;
  favorite: boolean;
}

export interface IEditOrderFormData {
  company: string;
  date: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  comment: string;
  ati: string;
  favorite: boolean;
}
