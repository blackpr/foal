import { Hook, Middleware } from '../interfaces';
import { defineMetadata, getMetadata } from '../utils';

export function postHook(postMiddleware: Middleware): Hook {
  return (target: any, methodName?: string) => {
    const preMiddlewares = getMetadata('pre-middlewares', target, methodName) || [];
    if (preMiddlewares.length > 0) {
      throw new Error('Post-hooks should be declared after pre-hooks.');
    }
    const postMiddlewares = getMetadata('post-middlewares', target, methodName) || [];
    postMiddlewares.unshift(postMiddleware);
    defineMetadata('post-middlewares', postMiddlewares, target, methodName);
  };
}
