import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Servidores')
export class Servidor {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ length: 100 })
  nombre_servidor: string;

  @Column({
    type: 'enum',
    enum: ['Windows Server', 'Ubuntu', 'CentOS', 'Otro'],
  })
  sistema_operativo: string;

  @Column({ type: 'int', comment: 'En GB' })
  memoria_ram: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, comment: 'En GB o TB' })
  capacidad_disco: number;

  @Column({ length: 45, unique: true })
  direccion_ip: string;

  @Column({
    type: 'enum',
    enum: ['Activo', 'Inactivo', 'En mantenimiento'],
    default: 'Activo',
  })
  estado: string;
}