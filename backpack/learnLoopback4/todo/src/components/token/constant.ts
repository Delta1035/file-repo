import {TokenService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';

export const SERVICE_BINDING = BindingKey.create<TokenService>(
  'services.authentication.jwt.tokenservice',
);
