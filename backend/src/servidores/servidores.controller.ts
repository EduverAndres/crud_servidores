import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ServidoresService } from "./servidores.service";
import { Servidor } from "./servidor.entity";

@Controller("servidores")
export class ServidoresController {
  constructor(private readonly servidoresService: ServidoresService) {}

  @Get()
  listarServidores(): Promise<Servidor[]> {
    return this.servidoresService.listarServidores();
  }

  @Get(":id")
  obtenerServidor(@Param("id") id: number): Promise<Servidor> {
    return this.servidoresService.obtenerServidor(id);
  }

  @Post()
  crearServidor(@Body() data: Partial<Servidor>): Promise<Servidor> {
    return this.servidoresService.crearServidor(data);
  }

  @Put(":id")
  actualizarServidor(
    @Param("id") id: number,
    @Body() data: Partial<Servidor>,
  ): Promise<Servidor> {
    return this.servidoresService.actualizarServidor(id, data);
  }

  @Delete(":id")
  eliminarServidor(@Param("id") id: number): Promise<void> {
    return this.servidoresService.eliminarServidor(id);
  }

  @Put(":id/estado")
  cambiarEstado(
    @Param("id") id: number,
    @Body("estado") estado: string,
  ): Promise<Servidor> {
    return this.servidoresService.cambiarEstado(id, estado);
  }
}
