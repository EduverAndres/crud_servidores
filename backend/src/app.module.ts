import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServidoresModule } from './servidores/servidores.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nuvoll_web',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Solo para desarrollo, en producción usa migraciones
    }),
    ServidoresModule,
  ],
})
export class AppModule {}