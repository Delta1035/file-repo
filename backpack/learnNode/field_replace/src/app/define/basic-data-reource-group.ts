export interface ResourceGroup extends Div{
  year: number;
  resource: string;
}

export interface Div{
  id: number;
  divName: string
}

export interface Division {
  id: number;
  name: string;
  divCode: string;
  function: string;
  rate: string
}
