import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServidoresController } from './servidores.controller';
import { ServidoresService } from './servidores.service';
import { Servidor } from './servidor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servidor])],
  controllers: [ServidoresController],
  providers: [ServidoresService],
})
export class ServidoresModule {}
