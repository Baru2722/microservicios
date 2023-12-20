const url = "api/docente";
var metodo="";

function save(bandera) {
    $("#modal-update").modal("hide")
    let id = $("#guardar").data("id");    
    let docente = {
        id: id,
        nombre : $("#nombre").val(),
        apellidopaterno : $("#apellidopaterno").val(),
        apellidomaterno : $("#apellidomaterno").val(),
        tipodocumento : $("#tipodocumento").val(),
        apellidomaterno : $("#apellidomaterno").val(),
        sexo: $("#sexo").val(),
        numerodocumento : $("#numerodocumento").val(),
        fechanacimiento : $("#fechanacimiento").val(),
        correo : $("#correo").val(),
        telefono : $("#telefono").val()
        
    };
    
    let metodo = bandera == 1 ? "POST" : "PUT";
    $.ajax({
        type: metodo,
        url: url,
        data: JSON.stringify(docente),
        dataType: "text",
        contentType: "application/json",
        cache: false,
        success: function (data) {
			if(data==0){
				Swal.fire({
	                icon: 'error',
	                title: 'El docente ya esta registrado',
	                showConfirmButton: false,
	                timer: 1500
	            })				
			}else{
	            let texto = bandera == 1 ? "guardado": "actualizado";
	            getTabla();
	            Swal.fire({
	                icon: 'success',
	                title: 'Se ha '+texto+' el docente',
	                showConfirmButton: false,
	                timer: 1500
	            })
	            clear();
            }
        },
    }).fail(function () {
                console.error("Error en la solicitud AJAX");
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
                title: 'Se ha eliminado al docente',
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

            let t = $("#tablaDocente").DataTable();
            t.clear().draw(false);

            let botonera = '<button type="button" class="btn btn-warning btn-sm editar"><i class="fas fa-edit"></i> </button>' +
                '<button type="button" class="btn btn-danger btn-sm eliminar"><i class="fas fa-trash"></i></button>';
            let js = JSON.parse(data);

            $.each(js, function (a, b) {
                t.row.add([b.id, b.nombre,b.apellidopaterno,b.apellidomaterno,b.tipodocumento,b.numerodocumento,b.sexo,b.fechanacimiento,b.correo,b.telefono, botonera]);

            });

            t.draw(false);

        },
    }).fail(function () {
        console.error("Error en la solicitud AJAX");
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
            $("#modal-title").text("Editar Docente");
            $("#nombre").val(data.nombre);
            $("#apellidopaterno").val(data.apellidopaterno);
            $("#apellidomaterno").val(data.apellidomaterno);
            $("#tipodocumento").val(data.tipodocumento);
            $("#numerodocumento").val(data.numerodocumento);
            $("#sexo").val(data.sexo);
            $("#fechanacimiento").val(data.fechanacimiento);
            $("#correo").val(data.correo);
            $("#telefono").val(data.telefono);
            
            $("#guardar").data("id", data.id);
            $("#guardar").data("bandera", 0);
            $("#modal-update").modal("show");
        },
    }).fail(function () {

    });
}

function clear() {
    $("#modal-title").text("Nuevo Docente");
    $("#nombre").val("");
    //$("#apellido_paterno").val("");
    //$("#apellido_materno").val("");
    $("#guardar").data("id", 0);
    $("#guardar").data("bandera", 1);
}

$(document).ready(function () {

    $("#tablaDocente").DataTable({
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
            { targets: 0, width: "10%" },
            { targets: 1, width: "80%" },
            { targets: 2, orderable: false, width: "10%" }
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
            title: 'Eliminar Docente',
            text: "¿Esta seguro de querer eliminar este Docente?",
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
});