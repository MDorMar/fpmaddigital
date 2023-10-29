addEventListener('load', inicializarEventos, false);

function inicializarEventos() {
	document.getElementById('limpiar').addEventListener('click', limpiar, false);
	document.getElementById('botonJSON').addEventListener('click', recuperaDatosJSON, false);
}

function limpiar() {
	document.getElementById('capaResultados').innerHTML = "";
}

function recuperaDatosJSON (){
	const http = new XMLHttpRequest();
	const url = 'alumnos.json';

	limpiar();

	http.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			procesaRespuestaJSON (JSON.parse(http.responseText));
		} else {
			document.getElementById('capaResultados').innerHTML = "Cargando ...";
		}
	}

	http.open ('GET', url, true);
	http.send();
}

function procesaRespuestaJSON(respuesta){
	let capaResultados = document.getElementById('capaResultados');
	capaResultados.innerHTML = "";

	for (let i in respuesta) {
		capaResultados.innerHTML += "</br>";
		capaResultados.innerHTML += "Grupo: " + i + "</br>";
		capaResultados.innerHTML += "Código de grupo: " + respuesta[i]["codGrupo"] + "</br>";
		capaResultados.innerHTML += "Nombre: " + respuesta[i]["nombreGrupo"] + "</br>";
		capaResultados.innerHTML += "Tutor: " + respuesta[i]["tutor"] + "</br>";
		capaResultados.innerHTML += "Alumnos: </br>";

		for (let j in respuesta[i]["alumnos"]) {
			capaResultados.innerHTML += " * " + respuesta[i]["alumnos"][j]["nombreAlumno"];
			capaResultados.innerHTML += " (" + respuesta[i]["alumnos"][j]["notaMedia"] + ")</br>";
		}
	}
}