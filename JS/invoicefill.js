//slide bar
$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
});

//Date format
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
today2 = yyyy + '-' + mm + '-' + '-' + dd;

/*-----------------------------------------------------*/
//inoice table
var i = 1;
const file = '<td><input id="name" type="text" name="product[]" placeholder= "Enter Product Name" class="form-control" /></td>' +
    '<td><input id="qty" type="number" name="qty[]" placeholder="Enter Qty" class="form-control qty" step="0" min="0" /></td>' +
    '<td><input  id="price" type="number" name="price[]" placeholder="Enter Unit Price" class="form-control price" step="0.00" min="0" /></td>' +
    '<td><input id="total" type="number" name="total[]" placeholder="0.00" class="form-control total" readonly /></td>' +
    '<td><button onclick="deleteRow(this)" class=" btn btn-default">Delete Row</button></td>' + '</tr>'

$("#add_row").click(function () {
    // let v = $('#addr' + i).html($('#addr' + b).html()).find('td:first-child').html(i + 1);
    $('#tab_logic').append('<tr>' + file);
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
/*---------------------------------------------------------------*/
//database
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var db = openDatabase('pharmacy', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        //tx.executeSql('drop table invoice')
        tx.executeSql('CREATE TABLE IF NOT EXISTS invoice (id INTEGER PRIMARY KEY ASC ,name,detial,tax,taxamount, date,grandTotal)');
    });
} else {
    alert("WebSQL is not supported by your browser!");
}
//Date format
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
today2 = yyyy + '-' + mm + '-' + '-' + dd;

function addinvoice() {
    debugger
    if (db) {
        var name = document.getElementById("inputname").value;
        var total_amount = document.getElementById("total_amount").value;
        var tax = document.getElementById("tax").value;
        var tax_amount = document.getElementById("tax_amount").value;
        /////////////////////////////////

        //////////////////////////////////////////
        var t = $("#tab_logic tbody tr").get().map(function (tr) {
            return $(tr).find("input").get().map(function (input) {
                return input.value
            })
        })
        for (let index = 0; index < t.length; index++) {
            const element = t[index];
            console.log("item " + index + ":" + element);//each row
            // for (let i = 0; i < element.length; i++) {
            //     const data = element[i];
            //     console.log(data);//each element alone
            // }
        }

        //Insert the user entered details into the medicene table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO invoice (name,detial,tax,taxamount, date,grandTotal) VALUES (?,?,?,?, ?,?)',
                [name, JSON.stringify(t), tax, tax_amount, today, total_amount])

        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function updateinvoiceList(transaction, results) {

    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("datainv");
    //clear cars list ul
    listholder.innerHTML = "";
    //Iterate through the results
    for (var i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<tr>" + "<td>" + row.id + " </td>" + "<td>" + row.name + " </td>" +
            "<td>" + row.date + "</td>" + "<td>" + row.grandTotal + " </td>" +
            "<td>" + '<button title="Edit" type="button"class="btn btn-sm" style="background-color: #028090;color: white;" aria-placeholder="invoice">' +
            '<i class="bi bi-pencil-square"></i>' + "</button>" +
            '<button title="Print" type="button" class="btn btn-success btn-sm">' + ' <i class="bi bi-collection"></i>' + '</button>' +
            "<a title='Delete' class='btn btn-danger btn-sm' href='javascript:void(0)' role='button' onclick='deleteinvoicelist(" + row.id + ")'><i class='bi bi-trash'></i></a>"
            + "</td>" + "</tr>";
    }
}

//function to get the list of cars from the database
function outputinvoicelist() {
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM invoice", [], updateinvoiceList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function deleteinvoicelist(id) {
    debugger
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM invoice WHERE id=?", [id], outputinvoicelist);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


outputinvoicelist();

//count expire
db.transaction(function (tx) {
    tx.executeSql('select expiredate from Medicine  ',
        [], function (tx, results) {
            var count = 0;
            var listholder = document.getElementById("expiredate")
            for (var i = 0; i < results.rows.length; i++) {
                for (var prop in results.rows.item(i)) {
                    if (results.rows.item(i)[prop] < today2) {
                        count++;
                        listholder.innerHTML = count
                        console.log(count);
                    }
                }
            }
        }, null);
});
