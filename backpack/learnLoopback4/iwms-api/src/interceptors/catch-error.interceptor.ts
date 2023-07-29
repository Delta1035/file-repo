import {
  globalInterceptor,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise
} from '@loopback/core';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('catchError', {tags: {name: 'catchError'}})
export class CatchErrorInterceptor implements Provider<Interceptor> {
  /*
  constructor() {}
  */

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    // const req = await invocationCtx.get(RestBindings.Http.REQUEST);
    // const res = await invocationCtx.get(RestBindings.Http.RESPONSE);
    // console.log(req);
    try {
      const result = await next();
      return result;
    } catch (err) {
      return {
        status: 500,
        message: err.message
      }
    }
  }
}
