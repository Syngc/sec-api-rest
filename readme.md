# SEC - ApiRest

## Instalar

Clonamos el proyecto , solo se instala en el caso de que se quiera modificar algo del server

```
git clone https://github.com/Syngc/sec-api-rest
```

dentro de la carpeta instalamos las dependencias

```
npm install
```

e iniciamos el servidor

```
npm start
```



## Rutas

#### Usuarios

##### login

Para el login se debe realizar la petición con POST

```
http://api-rest-sec.herokuapp.com/u/login
```

se debe tener en cuenta que se debe pasar como parametro los campos

- correo
- contraseña

Si es la primera vez que se ingresa correctamente se retornara status = 201 

##### Registrar Cliente

Para registrar se debe realizar la petición con POST

```
http://api-rest-sec.herokuapp.com/u/signup
```

se debe tener en cuenta que se debe pasar como parametro los campos

- id_cliente 
- id_tipo_documento
- correo
- nombre
- fecha_de_nacimiento
- genero

##### Cambiar contraseña

Se solicita atravez de una petición POST

```
http://api-rest-sec.herokuapp.com/u/put/login
```

Se debe pasar como parametros:

- correo
- contraseña



#### Empleados

##### Registrar administrador

Para registrar se debe realizar la petición con POST

```
http://api-rest-sec.herokuapp.com/e/administrador
```

se debe tener en cuenta que se debe pasar como parametro los campos

- id_administrador 

- id_tipo_documento

- correo

- nombre

- fecha_de_nacimiento

  ​

##### Registrar repartidor

Para registrar se debe realizar la petición con POST

```
http://api-rest-sec.herokuapp.com/e/repartidor
```

se debe tener en cuenta que se debe pasar como parametro los campos

- id_repartidor 
- id_tipo_documento
- correo
- nombre
- fecha_de_nacimiento
- horarios

##### Login

Para el login se debe realizar la petición con POST

```
http://api-rest-sec.herokuapp.com/e/login
```

se debe tener en cuenta que se debe pasar como parametro los campos

- correo
- tipo (administrador, repartidor, empleado)
- contraseña

Si es la primera vez que se ingresa correctamente se retornara status = 201 

##### Cambiar contraseña

Se solicita atravez de una petición POST

```
http://api-rest-sec.herokuapp.com/e/put/login
```

Se debe pasar como parametros:

- correo
- contraseña
- tipo (administrador, empleado, repartidor)

#### Medicamentos

##### Obtener todos los medicamentos

Se hace por medio de una petion GET

```
http://api-rest-sec.herokuapp.com/m/medicamentos
```

##### Obtener medicamentos por categoria

Se hace por medio de una peticion GET

```
http://api-rest-sec.herokuapp.com/m/medicamentos/:categoria
```

donde categoria puede ser una de las siguientes opciones:

- Niños
- Mamas
- Adultos
- Pomadas
- Pastillas
- Jarabes

##### Insertar medicamento

Para insertar un medicamento se hace por una peticion POST

```
http://api-rest-sec.herokuapp.com/m/medicamentos
```

se debe tener en cuenta que se debe pasar como parametro los campos

- id_codigo_inventario
- nombre
- unidades_disponibles
- fecha_de_vencimiento
- laboratorio
- precio_unidad
- categoria

##### Modificar medicamento

Para modificar un medicamento se hace por una peticion POST

```
http://api-rest-sec.herokuapp.com/m/put/medicamentos/:id
```

Donde id es el identificador unico del medicamento.

Los campos que es posible modificar son:

- nombre
- unidades_disponibles
- fecha_de_vencimiento
- laboratorio
- precio_unidad
- categoria

##### Eliminar medicamento 

Para modificar un medicamento se hace por una peticion POST

```
http://api-rest-sec.herokuapp.com/m/del/medicamentos/:id
```

Donde id es el identificador unico del medicamento.