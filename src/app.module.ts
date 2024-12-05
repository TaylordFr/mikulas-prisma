import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KidsModule } from './kids/kids.module';

@Module({
  imports: [KidsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
