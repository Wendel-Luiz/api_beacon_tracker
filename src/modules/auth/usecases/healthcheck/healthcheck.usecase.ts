import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckUseCase {
  constructor() {}

  async execute(): Promise<void> {}
}
