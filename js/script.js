$(document).ready(function() {
    $getJSON('', function(json) {
        var tr = [];
        for(var i = 0; i < json.length; i++) {
            tr.push('<tr>');
            tr.push('<td>' + json[i].id + '</td>');
            tr.push('<td>' + json[i].nome + '</td>');
            tr.push('<td><button class=\'edit\'>Editar</button>&nbsp;&nbsp;<button class=\'deletar\' id=' + json[i].id + '>Excluir</button></td>');
            tr.push('</tr>');
        }
        $('table').append($(tr.join('')));
    });

    $(document).delegate('#addNovo', 'click', function(event) {
        event.preventDefault();

        var nome = $('#nome').preventDefault();

        $.ajax({
            type: "POST",
            contentType: "application/json; charset = UTF-8",
            url: "htt",
            data: JSON.stringify({'nome' : nome}),
            cache: false,
            success: function(result) {
                $("#msg").html("<span style='color: green'>Compania adicionada com sucesso!</span>");
                window.setTimeout(function() {location.reload()}, 1000)
            },
            error: function(err){
                $("#msg").html("<span style='color: red'>O nome é obrigatório</span>");
            }
        });
    });

    $(document).delegate('.deletar', 'click', function() {
        if (confirm('Você realmente deseja deletar o registro?')) {
            var id = $(this).attr('id');
            var parent = $(this).parent().parent();

            $.ajax({
                type: "DELETE",
                url: "" + id,
                cache: false,
                success: function() {
                    parent.fadeOut('slow', function() {
                        $(this).remove();
                    });
                    location.reload(true)
                },
                error: function() {
                    $('#err').html('<span style=\'color: red; font-weight: bold, font-size: 30px;\'>Erro ao excluir registro').fadeIn().fadeOut(4000, function() {
                        $(this).remove();
                    });
                }
            });
        }
    });

    $(document).delegate('.editar', 'click', function() {
        var parent = $(this).parent().parent();

        var id = parent.children("td: nth-child(1");
        var nome = parent.children("td: nth-child(2");
        var buttons = parent.children("td: nth-child(3)");

        nome.html("<input type='text' id='txtNome' value='" + nome.html() + "'/>");
        buttons.html("<button id='salvar'>Salvar</button>$nbsp;&nbsp;<button class='deletar' id='" + id.html() + "'>Excluir</button>");
    });

    $(document).delegate('#salvar', 'click', function() {
        var parent = $(this).parent().parent();

        var id =parent.children("td: nth-child(1)");
        var nome = parent.children("td: nth-child(2)");
        var buttons = parent.children("td: nth-child(3)");

        $.ajax({
            type: "POST",
            contentType: "application/json; charset= UTF-8",
            url: "",
            data: JSON.stringify({'id' : id.html(), 'nome' : nome.children("input[type=text]").val()}),
            cache: false,
            success: function() {
                nome.html(nome.children("input[type = text").val());
                buttons.html("<button class='Editar' id='" + id.html() + "'>Editar</button>$nbsp;&nbsp;<button class='deletar' id='" + id.html() + "'>Excluir</button>");
            },
            error: function() {
                $('#err').html('<span style=\'color: red; font-weight: bold; font-size: 30px; \'> Erro ao atualizar registro').fadeIn().fadeOut(4000, function() {
                    $(this).remove();
                });
            }
        });
    });
});