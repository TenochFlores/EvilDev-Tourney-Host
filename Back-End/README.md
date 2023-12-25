# Backend Hub

Proyecto de backend para servir a la pagina web de EvilHubTourney.

Para simplificar el desarrollo y despliegue de la aplicacion, se utiliza Docker permitiendo un ambiente de desarrollo y 
pruebas agnostico a las diferentes arquitecturas de computo que tenemos como equipo.

## Uso
El unico requisito para ejecutar la aplicacion es tener el motor de Docker instalado y configurado.

Para hacer uso del backend de la aplicacion solo es necesario hacer uso del comando:

``` shell
docker compose up -d --build
```

Si se necesita hacer debugging, simplemente debe eliminarse la bandera `-d` que indica al motor de Docker que la sesion debe desligarse de la consola donde se ejecuta. 
Por tanto obtendremos la consola de ejecucion de la aplicacion Flask

