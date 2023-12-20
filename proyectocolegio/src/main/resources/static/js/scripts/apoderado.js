const url = "api/apoderado";
var metodo="";

function save(bandera) {
    $("#modal-update").modal("hide")
    let id = $("#guardar").data("id");    
    let apoderado = {
        id: id,
        nombre : $("#nombre").val(),
        apellidopaterno:$("#apellidopaterno").val(),
        apellidomaterno:$("#apellidomaterno").val(),
        dni:$("#dni").val(),
        telefono:$("#telefono").val(),
        ocupacion:$("#ocupacion").val(),
        direccion:$("#direccion").val(),
        alumno : {
					id: $("#alumno_id").val()
				}
    }
    let metodo = bandera == 1 ? "POST" : "PUT";
    $.ajax({
        type: metodo,
        url: url,
        data: JSON.stringify(apoderado),
        dataType: "text",
        contentType: "application/json",
        cache: false,
        success: function (data) {
			if(data==0){
				Swal.fire({
	                icon: 'error',
	                title: 'El apoderado ya esta registrado',
	                showConfirmButton: false,
	                timer: 1500
	            })				
			}else{
	            let texto = bandera == 1 ? "guardado": "actualizado";
	            getTabla();
	            Swal.fire({
	                icon: 'success',
	                title: 'Se ha '+texto+' el apoderado',
	                showConfirmButton: false,
	                timer: 1500
	            })
	            clear();
            }
        },
    }).fail(function () {
        
    });
}

function deleteFila(id) {
    $.ajax({
        type: "DELETE",
        url: url+"/"+id,
        data: {
            id: id,
        },
        cache: false,
        timeout: 600000,
        success: function (data) {
            Swal.fire({
                icon: 'success',
                title: 'Se ha eliminado el apoderado',
                showConfirmButton: false,
                timer: 1500
            });
            getTabla();
        },
    }).fail(function () {

    });

}

function getTabla() {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        cache: false,
        success: function (data) {

            let t = $("#tablaApoderado").DataTable();
            t.clear().draw(false);

            let botonera = '<button type="button" class="btn btn-warning btn-sm editar"><i class="fas fa-edit"></i> </button>' +
                '<button type="button" class="btn btn-danger btn-sm eliminar"><i class="fas fa-trash"></i></button>';

            let js = JSON.parse(data);

            $.each(js, function (a, b) {
                t.row.add([b.id, b.nombre,b.apellidopaterno,b.apellidomaterno,b.dni,b.telefono,b.ocupacion,b.direccion,b.alumno.nombre,  botonera]);

            });

            t.draw(false);

        },
    }).fail(function () {

    });
}


function getFila(id) {

    $.ajax({
        type: "GET",
        url: url +"/"+id,
        data: {
            id: id,
        },
        cache: false,
        timeout: 600000,
        success: function (data) {
            $("#modal-title").text("Editar Apoderado");
            $("#nombre").val(data.nombre);
            $("#apellidopaterno").val(data.apellidopaterno);
            $("#apellidomaterno").val(data.apellidomaterno);
            $("#dni").val(data.dni);
            $("#telefono").val(data.telefono);
            $("#ocupacion").val(data.ocupacion);
            $("#direccion").val(data.direccion);
            $("#alumno_id").val(data.alumno.id);
            $("#guardar").data("id", data.id);
            $("#guardar").data("bandera", 0);
            $("#modal-update").modal("show");
        },
    }).fail(function () {

    });
}

function clear() {
    $("#modal-title").text("Nuevo Apoderado");
    $("#nombre").val("");
    $("#guardar").data("id", 0);
    $("#guardar").data("bandera", 1);
}

function getSelect(){
	$.ajax({
        type: "GET",
        url: url + "/selectAlumno",
        cache: false,
        timeout: 600000,
        success: function (data) {
			$("#alumno_id").empty();
			for( var i = 0; i<data.length; i++){
				var id = data[i]['id'];
				var nombre = data[i]['nombre'];				
				$("#alumno_id").append("<option value='"+id+"'>"+nombre+"</option>");	
			}
        },
    }).fail(function () {
        
    });
}

$(document).ready(function () {

    $("#tablaApoderado").DataTable({
        language: {
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron coincidencias",
            info: "Mostrando del _START_ al _END_ DE _TOTAL_",
            infoEmpty: "Sin resultados",
            search: "Buscar: ",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior",
            },
        },
        columnDefs: [
            { targets: 0, width: "20%" },
            { targets: 1, width: "40%" },
            { targets: 2, orderable: false, width: "40%" }
        ],
    });
	
    clear();

    $("#nuevo").click(function () {
        clear();
    });

    $("#guardar").click(function () {

        let bandera = $("#guardar").data("bandera");
        save(bandera);
    })

    $(document).on('click', '.eliminar', function () {
        Swal.fire({
            title: 'Eliminar Apoderado',
            text: "¿Esta seguro de querer eliminar este Apoderado?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                let id = $($(this).parents('tr')[0].children[0]).text();
                deleteFila(id);
            }
        })
    });

    $(document).on('click', '.editar', function () {
        let id = $($(this).parents('tr')[0].children[0]).text();
        getFila(id);
    });
    getTabla();
    getSelect();

});