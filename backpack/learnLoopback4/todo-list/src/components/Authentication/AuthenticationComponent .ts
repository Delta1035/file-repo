import {
  AuthenticateActionProvider,
  AuthenticationBindings,
  AuthenticationStrategyProvider,
  AuthMetadataProvider,
} from '@loopback/authentication';
import {Component, ProviderMap} from '@loopback/core';

// ------ CODE THAT EXPLAINS THE MECHANISM ---------
export class AuthenticationComponent implements Component {
  providers?: ProviderMap;

  constructor() {
    this.providers = {
      // 绑定密钥绑定到该键，返回类型的身份验证装饰器元数据
      [AuthenticationBindings.AUTH_ACTION.key]: AuthenticateActionProvider,
      // 绑定密钥，返回类型的身份验证函数
      [AuthenticationBindings.STRATEGY.key]: AuthenticationStrategyProvider,
      // 绑定密钥，解析并返回身份验证 类型的策略
      [AuthenticationBindings.METADATA.key]: AuthMetadataProvider,
    };
  }
}
