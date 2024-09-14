# TODO => How to Start
# TODO => crear index config, y buscar como separar la conn con la db
## Arquitectura

¿Por qué una arquitectura basada en dominios?

- Organización clara por dominios
- Código escalable
- Modularidad, permite un desarrollo y mantenimiento más ágil

```bash
    src/
    ├── domains/
    │   ├── auth/
    │   │   ├── dto/
    │   │   ├── entities/
    │   │   ├── interfaces/
    │   │   ├── services/
    │   │   ├── guards/
    │   │   ├── strategies/
    │   │   ├── auth.controller.ts
    │   │   ├── auth.service.ts
    │   │   └── auth.module.ts
    │   │
    │   └── users/
    │       ├── dto/
    │       ├── entities/
    │       ├── services/
    │       ├── users.controller.ts
    │       ├── users.service.ts
    │       └── users.module.ts
    │
    ├── common/
    │   ├── decorators/
    │   ├── filters/
    │   ├── interceptors/
    │   └── pipes/
    │
    ├── app.module.ts
    └── main.ts
```

## Endpoints

```bash

http://localhost:8080/

```
