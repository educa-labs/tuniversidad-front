# Tuniversidad Frontend.

```
npm install
npm start
```
Ir a http://localhost:3000

Hay dos ramas principales ```master``` y ```development```. Para acceder a las últimas features hacer
``` 
git checkout -b development
```
**Importante:** Para reportar un bug por favor dejar una issue replicando el bug, es decir, describiendo paso a paso lo que se hizo para llegar al error.

##
Para production
Url servidor: tuniversidad.com
Via ssh hacer
```bash
cd /home/felipe/tuni-front
git pull origin development
npm run build
```
En caso de no verse reflejados los cambios, reiniciar nginx con
```bash
sudo service nginx restart
```
## Última actualización: 11 mayo 2017

### Features

 * Creación se usuarios
  
 * Login de usuarios
  
 * Navegación en el sitio (Side menú)
  
 * Vista en detalle de universidad
  
 * Vista rápida de carrera y universidad
  
 * **Búsqueda** de carreras y universidades con y sin **filtros** (falta el filtro de ciudad, molestar al señor del backend)





