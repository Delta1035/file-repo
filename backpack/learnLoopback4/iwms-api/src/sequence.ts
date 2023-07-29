/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： ML8100
 * 檔案說明： 控制Clinet與Server端的請求與回應
 * @CREATE Wed Aug 05 2020 下午5:51:26
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {
  AuthenticateFn,
  AuthenticationBindings
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  FindRoute,
  InvokeMethod,
  InvokeMiddleware,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler
} from '@loopback/rest';

const SequenceActions = RestBindings.SequenceActions;

/**
 * 控制Clinet與Server端的請求與回應
 *
 * @export
 * @class MySequence
 * @implements {SequenceHandler}
 */
export class MySequence implements SequenceHandler {
  /**
   * Optional invoker for registered middleware in a chain.
   * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
   *
   * @protected
   * @memberof MySequence
   */
  @inject(SequenceActions.INVOKE_MIDDLEWARE, {optional: true})
  protected invokeMiddleware: InvokeMiddleware = () => false;

  /**
   * @param findRoute   				找到對應路由
   * @param parseParams 				轉換參數
   * @param invoke      				調閱
   * @param send        				送出
   * @param reject      				拒絕
   * @param authenticateRequest 授權請求
   */
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS)
    protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn
  ) { }

  /**
   * 處理請求
   *
   * @method public
   * @param context 請求的內容
   */
  public async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const finished = await this.invokeMiddleware(context);
      if (finished) return;
      const route = this.findRoute(request);

      // 加入授權請求至序列
      await this.authenticateRequest(request);

      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
}
