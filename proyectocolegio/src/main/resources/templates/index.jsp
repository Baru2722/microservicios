<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Acceso al Sistema</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="css/Estilos.css" />
    </head>
	<body>
	    <div class="cabecera">
			<h3>Aula Virtual</h3>
			<h2>Intitución Educatica "Santa Lucía - Ferreñafe"</h2>
		</div>
		
	    <div class="titulo">
		<h1 id="SubTitulo">ACCESO AL SISTEMA</h1>
		</div>
		<div class="icono">
		<img class="Users"src="imagenes/user-group-man-woman.png" alt="Users">
		</div>
		<form name = "frm" action="ServAcceso?accion=loguin" method="POST">
		<div class="form">
		<table border="0" class="tabla">
		<tr>
			<td>USUARIO:</td>
			<td><input name="TxtUser" type="text" placeholder="usuario" autofocus required class="elemento"/></td>
		</tr>
		<tr>	
			<td>CONTRASEÑA:</td>
			<td><input name="TxtPass" type="password" placeholder="password" required class="elemento"/></td>
		</tr>
		</table>
		  </div>
		  <div>
			<input type="submit" value="Ingresar" class="boton"/>
			<input type="reset" value="Cancelar" class="boton"/>
		  </div>
		  
		  </div>
		</form>
		<footer>
		<div class="pie" >
			<span class="copy"></span> Derechos Reservados - Copyright </br>
			<p class="direccion">Av. Andrés Avelino Cáceres N°551</p></br>
			<hr></hr>
			<div class="logo">
			<img class="imgL" src="imagenes/boton-del-logo-de-facebook.png" alt="Facebook">
			<img class="imgL" src="imagenes/youtube.png" alt="Youtube">
			<img class="imgL" src="imagenes/logo-de-instagram.png" alt="Instagram">
			</div>
			
			
		</div>
		
	</footer>
	</body>
	
</html>