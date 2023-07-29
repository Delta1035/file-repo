export interface Application {
  apId: string;
  description: string;
  parent: Application[];
  url: string;
  menuItemSeq: number;
}

export interface AppConfig {
  DEFAULTTIMEOUT(
    DEFAULTTIMEOUT: any
  ): import('rxjs').OperatorFunction<
    import('@angular/common/http').HttpEvent<any>,
    import('@angular/common/http').HttpEvent<any>
  >;
  impBaseURL: string;
  apiVersion: string;
  apiFormat: string;
  impversion: string;
  mqtturl: string;
  mqttport: number;
  mqttcheckconnentionduration: number;
  mqtttopic: string[];
}

export interface Confirm {
  code: number;
  message: string;
}

export interface CardInfo {
  name: string;
  description: string;
  url: string;
  imageName: string;
}

export interface apiResponse {
  code: number;
  message: string;
  data: keyValue[];
}

export interface keyValue<T = any> {
  key: T;
  value: T;
}
