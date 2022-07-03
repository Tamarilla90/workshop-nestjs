Creamos un crud de usuario y usamos una mongo como bbdd usando el modo type orm

Steps

Step 1

1. nest g resource user

2. npm install @nestjs/typeorm typeorm mongodb

3. Configuramos mongo

4. Generamos la entidad para ello ponemos la anotacion de entity y creamos la columna en la bbdd

5. Añadimos nuestra entidad al type orm de mongo en el module de nuetra applicacion

6. Importamos el repository en nuestro servicio y usamos las funciones del orm para la entidad

Step 2

1. Creamos un pipe validation
2. nest g module commons
3. cd src/commons
4. mkdir pipe
5. cd pipe
6. nest g pipe validation
7. npm i --save class-validator class-transformer
8. Añadimos el codigo de la pipe de valdacion
9. Exportamols en nuestro commons la pipe
10. Añadimos la pipe de manera global para que todos nuestros recursos validen la entrada
11. Modificamos los DTOs con las validaciones pertinentes