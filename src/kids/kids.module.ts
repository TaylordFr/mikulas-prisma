import { Module } from '@nestjs/common';
import { KidsService } from './kids.service';
import { KidsController } from './kids.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [KidsController],
  providers: [KidsService, PrismaService],
})
export class KidsModule {}
