Crear una aplicación de gestión de servidores utilizando Angular o Python que permita
monitorear y administrar información básica de servidores.

● Añadir nuevos servidores con la siguiente información:
○ Nombre del servidor
○ Sistema operativo (Windows Server, Ubuntu, CentOS, etc.)
○ Memoria RAM (GB)
○ Capacidad de disco duro (GB/TB)
○ Dirección IP
○ Estado (Activo, Inactivo, En mantenimiento)
--------------------------------------------------
● Listar todos los servidores registrados
● Ver detalles de un servidor específico
● Editar información de servidores
● Eliminar servidores
● Cambiar el estado de los servidores

----------------------------------------------------
TABLA MYSQL(XAMPP)

CREATE TABLE Servidores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servidor VARCHAR(100) NOT NULL,
    sistema_operativo ENUM('Windows Server', 'Ubuntu', 'CentOS', 'Otro') NOT NULL,
    memoria_ram INT NOT NULL COMMENT 'En GB',
    capacidad_disco DECIMAL(6,2) NOT NULL COMMENT 'En GB o TB',
    direccion_ip VARCHAR(45) NOT NULL UNIQUE,
    estado ENUM('Activo', 'Inactivo', 'En mantenimiento') NOT NULL DEFAULT 'Activo'
);

--------------------------------------------------
script para correr FRONT 
cd front
ng serve open --
script para correr BACK
npm run start:dev
  
