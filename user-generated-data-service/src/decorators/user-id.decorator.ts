import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const UserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.userId;
  }
);
