# Cómo empezar

Cloná el repositorio en tu carpeta:

```bash
git clone https://github.com/TomasSorgetti/nomada-wifi-challenge-server.git
```

Entrá en la carpeta del proyecto e instalá las dependencias

```bash
cd todosgamers-challenge-server
npm install
```

Para abrir en tu ide:

```bash
code .
```

Creá un archivo .env y completá las variables con tus datos

```bash
#jwt
JWT_ACCESS_SECRET=123456789
JWT_ACCESS_EXPIRES_IN=24h
JWT_REFRESH_SECRET=123456789
JWT_REFRESH_EXPIRES_IN=60d

#database
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
DB_DATABASE=tu_db_name
DB_SYNCHRONIZE=true
```

Creá una base de datos en mysql con el mismo nombre que en el .env (DB_DATABASE)

```sql

mysql -u tu_usuario -p
CREATE DATABASE tu_db_name;

```

Levanta el proyecto (puerto 8080)

```bash
npm run start:dev
```

## Arquitectura del Backend

```bash
    src/
    ├── common/                                     #carpeta para los archivos compartidos
    │   └── services/
    │       ├── jwt.service.ts
    │       ├── password.service.ts
    │       └── sensitiveUser.service.ts
    │       
    ├── config/                                     #carpeta para las configuraciónes de variables
    │   ├── database.config.ts
    │   └── jwt.config.ts
    │   
    ├── database/
    │   └── database.module.ts                      #config de la database
    │   
    ├── domains/                                    #carpeta que contiene los dominios
    │   ├── auth/                                       #dominio de autenticación
    │   │   ├── dto/
    │   │   ├── entities/
    │   │   ├── guards/
    │   │   ├── strategies/
    │   │   ├── auth.controller.ts
    │   │   ├── auth.service.ts
    │   │   └── auth.module.ts
    │   │
    │   ├── roles/                                      #dominio de roles
    │   │   ├── dto/
    │   │   ├── entities/
    │   │   ├── roles.controller.ts
    │   │   ├── roles.service.ts
    │   │   └── roles.module.ts
    │   │
    │   └── users/                                      #dominio de usuarios
    │       ├── dto/
    │       ├── entities/
    │       ├── users.controller.ts
    │       ├── users.service.ts
    │       └── users.module.ts
    │
    ├── app.module.ts
    └── main.ts
```

## Endpoints

```bash
#endpoint principal
http://localhost:8080/api/v1

#endpoint health
GET http://localhost:8080/api/v1/health

```

```bash

#auth
#endpoint para registrar usuario
POST http://localhost:8080/api/v1/auth/register

#endpoint para iniciar sesión
POST http://localhost:8080/api/v1/auth/login

#endpoint para cerrar sesión
POST http://localhost:8080/api/v1/auth/logout

#endpoint para refrescar el token
POST http://localhost:8080/api/v1/auth/refresh

#endpoint para obtener el detalle de usuario
GET http://localhost:8080/api/v1/auth/me

```

```bash
#roles
#endpoint para crear un rol
POST http://localhost:8080/api/v1/roles

#endpoint para obtener todos los roles
GET http://localhost:8080/api/v1/auth/roles

#endpoint para modificar un rol
PATCH http://localhost:8080/api/v1/roles

#endpoint para eliminar un rol
DELETE http://localhost:8080/api/v1/auth/roles
```

```bash
#usuarios
#endpoint para eliminar un usuario
DELETE http://localhost:8080/api/v1/auth/users
```
