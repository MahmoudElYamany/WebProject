
$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
});



// var db = openDatabase('pharmacy', '1.0', 'Test DB', 2* 1024 * 1024); 

// db.transaction(function (tx) {   

//     tx.executeSql('CREATE TABLE IF NOT EXISTS user (customerName unique,Address,Mobile,Phone,Email,Gender)');
//     });

// //connect input tag with database
// function adduser() {
//     var name = document.getElementById("inlineFormInputGroup").value;
//     var address = document.getElementById("inputAddress").value;
//     var mobile = document.getElementById("inputMobile").value;
//     var Phone = document.getElementById("inputPhone").value;
//     var email = document.getElementById("inputEmail").value;
//     var gender = document.getElementById("inputGender").value;
//     var city = document.getElementById("inputCity").value;
//     var state = document.getElementById("inputState").value;
//     var zip = document.getElementById("inputZip").value;
//     var total = address + " , "+city+ " , "+state + " , "+zip; 
//     db.transaction(function (tx) {
//         tx.executeSql('INSERT INTO user (customerName , address, Mobile, phone, Email, Gender) VALUES (?,?,?,?,?,?)', 
//     [name,total,mobile,Phone,email,gender])
//     });
// }
//diplay Table
// db.transaction(function (tx) {
//     tx.executeSql('SELECT * FROM user', [], function (tx, results) {
//         var html=" <tr>";

//         for (var i = 0; i < results.rows.length; i++) {

//             for (var prop in results.rows.item(i)) {
//                 html += "<td>" + results.rows.item(i)[prop] + "</td>";
//             }
//             html += "<td>"+'<button type=\"button\" class=\"btn btn-success btn-sm\">'
//                 +'<i class="bi bi-pencil-square"></i>'+'</button>'+
//             '<button type=\"button\" class=\"btn btn-danger btn-sm\">'+
//                 '<i class=\"bi bi-trash\"></i>'+'</button>'+'</td>'+"</tr>";
//         }

//         document.getElementById("data").innerHTML = html;
//     });
// });


//Test for browser compatibility
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    // var db = openDatabase("cars_db", "0.1", "A Database of Cars I Like", 1024 * 1024);
    var db = openDatabase('pharmacy', '1.0', 'Test DB', 2 * 1024 * 1024);
    //create the cars table using SQL for the database using a transaction
    // db.transaction(function(t) {
    //     t.executeSql("CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY ASC, make TEXT, model TEXT)");
    // });

    db.transaction(function (tx) {

        tx.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY ASC ,customerName ,Address,Mobile,Phone,Email,Gender)');
    });


} else {
    alert("WebSQL is not supported by your browser!");
}

//function to output the list of cars in the database

function updateList(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("data");

    //clear cars list ul
    listholder.innerHTML = "";


    //Iterate through the results
    for (var i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<tr>" + '<td>' + row.customerName + " </td>" + '<td>' + row.Address +
            " </td>" + '<td>' + row.Mobile + " </td>" + '<td>' + row.Phone + " </td>" + '<td>' + row.Email + " </td>" +
            '<td>' + row.Gender + " </td>" + "<td>" + '<button type=\"button\" class=\"btn btn-success btn-sm\">'
            + '<i class="bi bi-pencil-square"></i>' + '</button>' +
            "<button type='button' class='btn btn-danger btn-sm'  'onclick='deleteCar(" + row.id + ");>" +
            '<i class=\"bi bi-trash\"></i>' + '</button>' + '</td>' + "</tr>"

    }

}

//function to get the list of cars from the database

function outputCars() {
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM user", [], updateList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

//function to add the car to the database

function add() {
    //check to ensure the db object has been created
    if (db) {
        //get the values of the make and model text inputs
        var name = document.getElementById("inlineFormInputGroup").value;
        var address = document.getElementById("inputAddress").value;
        var mobile = document.getElementById("inputMobile").value;
        var Phone = document.getElementById("inputPhone").value;
        var email = document.getElementById("inputEmail").value;
        var gender = document.getElementById("inputGender").value;
        var city = document.getElementById("inputCity").value;
        var state = document.getElementById("inputState").value;
        var zip = document.getElementById("inputZip").value;
        var total = address + " , " + city + " , " + state + " , " + zip;

        //Test to ensure that the user has entered both a make and model
        if (name !== "" && mobile !== "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO user (customerName , address, Mobile, phone, Email, Gender) VALUES (?,?,?,?,?,?)', 
     [name,total,mobile,Phone,email,gender])
            });
        } else {
            alert("You must enter a make and model!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


//function to remove a car from the database, passed the row id as it's only parameter

function deleteCar(id) {
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM user WHERE id=?", [id], outputCars);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

outputCars();



