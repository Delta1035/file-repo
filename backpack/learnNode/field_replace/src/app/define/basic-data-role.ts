export interface basicData {
  bo: string;
  bu: string;
  bg: string;
}

export interface BasicDataRules extends basicData {
  id: number;
}

export interface BO {
  id: number;
  bo: string;
}

export interface BU {
  id: number;
  bu: string;
  bgId?: number;
  bo?: number;
}

export interface BG {
  id: number;
  boId?: number;
  bg: string;
}

export interface AddInfo {
  id: number;
  bo: string;
  bu: string;
  bg: string;
}

export interface SelectList {
  id: number;
  bo: string;
  bgs: BG[];
}

export interface BasicAllData {
  id: number;
  bo: string;
  bgs: Array<{
    id: number;
    boId: number;
    bg: string;
    bus: Array<{
      id: number;
      bgId: number;
      bu: string;
    }>
  }>
}
