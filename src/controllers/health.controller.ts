import { Controller, Get } from '@nestjs/common';
import {
  TypeOrmHealthIndicator,
  HealthCheckService,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class healthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get('postgres')
  @HealthCheck()
  checkPostgres() {
    return this.health.check([
      () => this.db.pingCheck('postgres', { timeout: 1000 }),
    ]);
  }
}
