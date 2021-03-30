SIM-DCS

Este proyecto cuenta con un servidor node que expone un sitio web desarrollado en angular. (puerto 3080)
Ademas escucha en dos puertos 9181 y 9182 envio de datos desde el engine de dcs.

La idea final seria tener una imagen en docker con todo listo para su uso.

Actualmente uso docker para levantar una instancia de mongo.

Los comandos utilizados son:

docker pull mongo //Para descargar la imagen de mongo.

//Para mantener la informacion, hay que crear un volumen de dockers. Hay que crear la carpeta mongodata.

docker run -p 27017:27017 -it -v mongodata:/data/db --rm --name mongodb -d --network sim-dcs-net mongo  //Para levantar un container con la imagen de mongo

docker exec -it mongodb bash //Si queremos ingresar a la consola de mongo.


Comandos utiles de git:
git add *
git commit -m "adasdasdsa"
git push -u origin main
//git init
//git branch -M main //crear branch local
//git remote add origin https://github.com/ebarbin/sim-dcs.git


//docker build . -t ebarbin/sim-dcs:0.0.1
//docker run -p 8080:8080 -p 9181:9181/udp -p 9182:9182/udp --name sim-dcs -it --rm --network sim-dcs-net ebarbin/sim-dcs:0.0.1

//docker build . -t ebarbin/sim-dcs:0.0.1-GIO --build-arg DEFAULT_URL=181.226.134.148
//docker run -p 8080:8080 -p 9181:9181/udp -p 9182:9182/udp --name sim-dcs -it --rm --network sim-dcs-net ebarbin/sim-dcs:0.0.1-GIO

//docker network create sim-dcs-net