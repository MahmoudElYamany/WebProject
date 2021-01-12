
//slide bar
$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
});


/*----------------------------------------------------------------------------------------*/

//database medicince
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var db = openDatabase('pharmacy', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        //tx.executeSql('drop table Medicine')
        tx.executeSql('CREATE TABLE IF NOT EXISTS staff (id INTEGER PRIMARY KEY ASC ,Quantity, medicineName ,GenericName,category ,manufucturer ,shelf ,Price ,strength ,image, code, Medicinetype, detials, expiredate, boxsize, unit)');
    });
} else {
    alert("WebSQL is not supported by your browser!");
}
//function to add 
function addstaff() {

    //check to ensure the db object has been created
    if (db) {
        //get the values of the make and model text inputs
        var name = document.getElementById("inlineFormInputGroup").value;
        var gender = document.getElementById("inputGender").value;
        var blood = document.getElementById("inputBlood").value;
        var image = document.getElementById("inputimage").value;
        var address = document.getElementById("inputAddress").value;
        var mobile = document.getElementById("inputMobile").value;
        var Phone = document.getElementById("inputPhone").value;
        var email = document.getElementById("inputEmail").value;
        
        var city = document.getElementById("inputCity").value;
        var state = document.getElementById("inputState").value;
        var zip = document.getElementById("inputZip").value;
        var total = address + " , " + city + " , " + state + " , " + zip;/

     

        //Test to ensure that the user has entered both a make and model
        if (Mname !== "" && Gname !== "" && unit !== "" && size !== "" && type !== "" && manf !== "" && date !== "") {
            //Insert the user entered details into the medicene table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO Medicine (Quantity, medicineName ,GenericName,category ,manufucturer ,shelf ,Price ,strength , code, Medicinetype, detials, expiredate, boxsize, unit) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    [quantity, fullname, Gname, category, manf, shelf, totalprice, str, print, type, detial, date, size, unit])

            });
        } else {
            alert("You must enter the * field!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function updatemedicineList(transaction, results) {
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

        listholder.innerHTML += "<tr>" + "<td>" + row.Quantity + " </td>" + "<td>" + row.medicineName + " </td>" +
            "<td>" + row.GenericName + "</td>" + "<td>" + row.category + " </td>" + "<td>" + row.manufucturer + "</td>" +
            "<td>" + row.shelf + " </td>" +"<td>" + row.price + " </td>" +"<td>" + row.strength + " </td>" +
            "<td>" + row.image + " </td>"+"<td>" +
            "<a class='btn btn-danger btn-sm' href='javascript:void(0)' role='button' data-target='#hh' data-toggle='modal' onclick='deletemedicinelist(" + row.id + ")'><i class='bi bi-trash'></i></a>"
            + "</td>" + "</tr>";
    }
}

//function to get the list of cars from the database
function outputmedicinelist() {
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {
            tx.executeSql("SELECT Quantity, medicineName ,GenericName,category,manufucturer  ,shelf, Price, Price,strength, image FROM Medicine", [], updatemedicineList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function deletemedicinelist(id) {
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM Medicine WHERE id=?", [id], outputmedicinelist);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

outputmedicinelist();
