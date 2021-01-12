
var i = 1;
const file ='<td><input type="text" name="product[]" placeholder= "Enter Product Name" class="form-control" /></td>'+
            '<td><input type="number" name="qty[]" placeholder="Enter Qty" class="form-control qty" step="0" min="0" /></td>'+
            '<td><input type="number" name="price[]" placeholder="Enter Unit Price" class="form-control price" step="0.00" min="0" /></td>'+
            '<td><input type="number" name="total[]" placeholder="0.00" class="form-control total" readonly /></td>'+
            '<td><button onclick="deleteRow(this)" class=" btn btn-default">Delete Row</button></td>'+'</tr>'
            
$("#add_row").click(function () {

    
   // let v = $('#addr' + i).html($('#addr' + b).html()).find('td:first-child').html(i + 1);
    $('#tab_logic').append('<tr>'+'<td>'+i+'</td>'+file);
    i++;
    
});

function deleteRow(btn) {
    $(btn).parents("tr").remove();
  
   
    calc(this);
}


$('#tab_logic tbody').on('keyup change', function () {
    calc();
});
$('#tax').on('keyup change', function () {
    calc_total();
});




function calc() {
    $('#tab_logic tbody tr').each(function (i, element) {
        var html = $(this).html();
        if (html != '') {
            var qty = $(this).find('.qty').val();
            var price = $(this).find('.price').val();
            $(this).find('.total').val(qty * price);

            calc_total();
        }
    });
}

function calc_total() {
    total = 0;
    $('.total').each(function () {
        total += parseInt($(this).val());
    });
    $('#sub_total').val(total.toFixed(2));
    tax_sum = total / 100 * $('#tax').val();
    $('#tax_amount').val(tax_sum.toFixed(2));
    $('#total_amount').val((tax_sum + total).toFixed(2));
}