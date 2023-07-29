export interface Division {
    colorRow?: {},
    id?: number,
    div_group: string,
    functions: string,
    div: string,
    rate?: number,
    name?:string
}

export interface QueryDiv{
  div: string;
  div_code?: string;
  functions?: string
}
