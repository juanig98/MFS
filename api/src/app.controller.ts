import { Controller, Get, Res } from '@nestjs/common';
import { StatusResultResponse } from './models/interfaces/StatusResultResponse';

@Controller()
export class AppController {
  @Get()
  async index(@Res() res) {
    res.sendFile('index.html', { root: 'public' });
  }

  @Get('status')
  async status(): Promise<StatusResultResponse<{ message: string, environment?: string }>> {
    if (process.env.ENVIRONMENT != 'PRODUCTION') return { statusCode: 200, result: { message: "Server found", environment: "TEST" } }
    return {
      statusCode: 200,
      result: { message: "Server found" }
    };
  }
}
