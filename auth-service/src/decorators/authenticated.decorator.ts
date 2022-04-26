import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const Authenticated = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.authenticated;
  }
);
