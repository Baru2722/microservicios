const url = "api/asignacion";
var metodo="";

function save(bandera) {
    $("#modal-update").modal("hide")
    let id = $("#guardar").data("id");    
    let asignacion = {
        id: id,
	
        docente : {
			id: $("#docente_id").val()}
		,
		
		aula : {
			id: $("#aula_id").val()}
		,
	
		horario : {
			id: $("#horario_id").val()}
			,
	
		curso : {
			id: $("#curso_id").val()}
        
    }
    let metodo = bandera == 1 ? "POST" : "PUT";
    $.ajax({
        type: metodo,
        url: url,
        data: JSON.stringify(asignacion),
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
                title: 'Se ha eliminado la asignacion',
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

            let t = $("#tablaAsignacion").DataTable();
            t.clear().draw(false);

            let botonera = '<button type="button" class="btn btn-warning btn-sm editar"><i class="fas fa-edit"></i> </button>' +
                '<button type="button" class="btn btn-danger btn-sm eliminar"><i class="fas fa-trash"></i></button>';

            let js = JSON.parse(data);

            $.each(js, function (a, b) {
                t.row.add([b.id, b.docente.nombre,b.aula.numero, b.curso.nombre, b.horario.dia, botonera]);

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
            $("#modal-title").text("Editar Asignacion");
            
            $("#docente_id").val(data.docente.id);
            $("#aula_id").val(data.aula.id);
            $("#curso_id").val(data.curso.id);
            $("#horario_id").val(data.horario.id);
            $("#guardar").data("id", data.id);
            $("#guardar").data("bandera", 0);
            $("#modal-update").modal("show");
        },
    }).fail(function () {

    });
}

function clear() {
    $("#modal-title").text("Nueva Asignación");
    $("#docente_id").val("");
    $("#guardar").data("id", 0);
    $("#guardar").data("bandera", 1);
}

function getSelect() {
    $.ajax({
        type: "GET",
        url: url + "/selectDocente",
        cache: false,
        timeout: 600000,
        success: function (data) {
            $("#docente_id").empty();
            for (var i = 0; i < data.length; i++) {
                var id = data[i]['id'];
                var nombre = data[i]['nombre'];
                $("#docente_id").append("<option value='" + id + "'>" + nombre + "</option>");
            }
        },
    }).fail(function () {

    });

    $.ajax({
        type: "GET",
        url: url + "/selectAula",
        cache: false,
        timeout: 600000,
        success: function (data) {
            $("#aula_id").empty();
            for (var i = 0; i < data.length; i++) {
                var id = data[i]['id'];
                var numero = data[i]['numero'];
                $("#aula_id").append("<option value='" + id + "'>" + numero + "</option>");
            }
        },
    }).fail(function () {

    });
    
        $.ajax({
        type: "GET",
        url: url + "/selectCurso",
        cache: false,
        timeout: 600000,
        success: function (data) {
            $("#curso_id").empty();
            for (var i = 0; i < data.length; i++) {
                var id = data[i]['id'];
                var nombre = data[i]['nombre'];
                $("#curso_id").append("<option value='" + id + "'>" + nombre + "</option>");
            }
        },
    }).fail(function () {

    });
}

    $.ajax({
        type: "GET",
        url: url + "/selectHorario",
        cache: false,
        timeout: 600000,
        success: function (data) {
            $("#horario_id").empty();
            for (var i = 0; i < data.length; i++) {
                var id = data[i]['id'];
                var dia = data[i]['dia'];
                $("#horario_id").append("<option value='" + id + "'>" + dia + "</option>");
            }
        },
    }).fail(function () {

    });



$(document).ready(function () {

    $("#tablaAsignacion").DataTable({
        language: {
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron asignaciones",
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
            title: 'Eliminar asignacion',
            text: "¿Esta seguro de querer eliminar esta asignacion?",
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