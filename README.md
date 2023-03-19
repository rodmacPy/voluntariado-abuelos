# Abuelos en Comunidad

Abuelos en Comunidad es un proyecto de voluntariado sin fines de lucro que busca reunir voluntarios para participar en actividades de integración con personas mayores que necesitan compañía. La página web permite a los voluntarios unirse a diferentes actividades, como cumpleaños, tardes de películas, entre otras, para que los abuelos puedan disfrutar de momentos especiales y recibir la compañía que necesitan.

## Instalación

Para instalar el proyecto en tu máquina local, primero clona el repositorio:
```bash
git clone https://github.com/rodmacPy/voluntariado-abuelos
```

## Cliente

Para iniciar el cliente, primero necesitas instalar las dependencias. En la carpeta cliente ejecuta:
```bash
npm install
```

Luego, inicia el cliente con el siguiente comando:
```bash
npm run dev
```
## Servidor

Para iniciar el servidor, primero necesitas instalar las dependencias. En la carpeta servidor ejecuta:
```bash
npm install
```

Crea un archivo .env en la carpeta servidor y agrega las siguientes variables de entorno:
```bash
PORT=
MONGODB_CNN=mongodb://127.0.0.1:27017/abuelos
SECRETORPRIVATEKEY=
```

Para iniciar el servidor, ejecuta el siguiente comando en la carpeta servidor:
```bash
node app.js
```

También puedes utilizar Nodemon para reiniciar automáticamente el servidor cada vez que hagas cambios en el código:
```bash
nodemon app.js
```

## Tecnologías utilizadas

El proyecto se desarrolló utilizando las siguientes tecnologías:

### Cliente

- Vite
- React
- React Router DOM
- Animate.css
- Axios

### Servidor

- Node.js
- Express.js
- MongoDB
- Express-fileupload
- Express-validator
- Jsonwebtoken
- Uuid
- Bcryptjs
- Axios
- Cors

## Contribuir

Si deseas contribuir al proyecto, puedes hacer un fork del repositorio y enviar tus cambios en un pull request.

## Licencia

Este proyecto utiliza la licencia MIT.