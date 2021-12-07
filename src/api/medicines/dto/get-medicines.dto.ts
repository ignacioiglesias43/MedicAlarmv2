import {AxiosResponse} from 'axios';
import {Medicine} from '../model/Medicines';

export interface GetMedicinesDTO extends AxiosResponse<GetMedicinesData> {}
export interface GetFilterMedicineDTO extends AxiosResponse<GetFilterMedicine>{}
interface GetMedicinesData {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  prev_page_url: string | null;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  path: string;
  links: Array<any>;
  data: Medicine[];
}

interface GetFilterMedicine {
  data: Array<Medicine>
}
