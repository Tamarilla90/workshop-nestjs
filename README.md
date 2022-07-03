Creamos un crud de usuario y usamos una mongo como bbdd usando el modo type orm

Steps

Step 1

1. nest g resource user

2. npm install @nestjs/typeorm typeorm mongodb

3. Configuramos mongo

4. Generamos la entidad para ello ponemos la anotacion de entity y creamos la columna en la bbdd

5. Añadimos nuestra entidad al type orm de mongo en el module de nuetra applicacion

6. Importamos el repository en nuestro servicio y usamos las funciones del orm para la entidad