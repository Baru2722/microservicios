const url = "api/aula";
var metodo="";

function save(bandera) {
    $("#modal-update").modal("hide")
    let id = $("#guardar").data("id");    
    let aula = {
        id: id,
        numero : $("#numero").val(),
        capacidad : $("#capacidad").val()
    }
     if (!validarCampos()) {
        return; // Si la validación falla, detenemos el proceso de guardado.
    }
    $("#modal-update").modal("hide");

       // Definir el método y la URL de la solicitud HTTP
        let metodo = id ? "PUT" : "POST"; // Si el ID está presente, es una actualización (PUT), de lo contrario, es una creación (POST)
        let url = "/api/aula";
     
        if (metodo === "PUT") {
            url += `/${id}`;
        }
    
        $.ajax({
        type: metodo,
        url: url,
        data: JSON.stringify(aula),
        dataType: "text",
        contentType: "application/json",
        cache: false,
        success: function (data) {
			if(data==0){
				Swal.fire({
	                icon: 'error',
	                title: 'El aula ya esta registrada',
	                showConfirmButton: false,
	                timer: 1500
	            })				
			}else{
	            let texto = bandera == 1 ? "guardado": "actualizado";
	            getTabla();
	            Swal.fire({
	                icon: 'success',
	                title: 'Se ha '+texto+' el aula',
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
                title: 'Se ha eliminado el aula',
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

            let t = $("#tablaAula").DataTable();
            t.clear().draw(false);

            let botonera = '<button type="button" class="btn btn-warning btn-sm editar"><i class="fas fa-edit"></i> </button>' +
                '<button type="button" class="btn btn-danger btn-sm eliminar"><i class="fas fa-trash"></i></button>';

            let js = JSON.parse(data);

            $.each(js, function (a, b) {
                t.row.add([b.id, b.numero,b.capacidad, botonera]);

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
            $("#modal-title").text("Editar Aula");
            $("#numero").val(data.numero);
            $("#capacidad").val(data.capacidad);
            $("#guardar").data("id", data.id);
            $("#guardar").data("bandera", 0);
            $("#modal-update").modal("show");
        },
    }).fail(function () {

    });
}

function clear() {
    $("#modal-title").text("Nueva Aula");
    $("#numero").val("");
    $("#guardar").data("id", 0);
    $("#guardar").data("bandera", 1);
}

$(document).ready(function () {

    $("#tablaAula").DataTable({
        language: {
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron aulas",
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
            title: 'Eliminar Aula',
            text: "¿Esta seguro de querer eliminar esta aula?",
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

function validarCampos() {
    const capacidad = $("#capacidad").val();

    if ( !capacidad ) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, rellena todos los campos.',
            showConfirmButton: false,
            timer: 3000
        });
        return false;
    }

    const numeroRegex = /^[0-9]+$/;
    if (!capacidad.match(numeroRegex)) {
        Swal.fire({
            icon: 'error',
            title: 'capacidad inválido',
            text: 'La capacidad debe contener solo números',
            showConfirmButton: false,
            timer: 3000
        });
        return false;
    }

    return true;
}
