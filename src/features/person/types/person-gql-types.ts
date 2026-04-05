export interface CreatePersonInterface {
  first_name: string;
  last_name: string;
  second_last_name?: string;
  sex: string;
  birth_date: string;
  rfc: string;
  curp: string;
  person_type: string;
  company_name?: string;
}