docker pull mongo //si no esta la imagen

//crear carpeta mongodata

docker run -p 27017:27017 -it -v mongodata:/data/db --rm --name mongodb -d mongo  //para levantar el container

docker exec -it mongodb bash //ingresar en la consola de mongo


//git
git add *
git commit -m "adasdasdsa"
git push -u origin main
//git init
//git branch -M main //crear branch local
//git remote add origin https://github.com/ebarbin/sim-dcs.git