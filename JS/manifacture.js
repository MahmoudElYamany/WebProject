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

/*----------------------------------------------------------------------------------------*/

//database medicince
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var db = openDatabase('pharmacy', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        //tx.executeSql('drop table staff')
        tx.executeSql('CREATE TABLE IF NOT EXISTS manifcature (id INTEGER PRIMARY KEY ASC,name, email, mobile, phone, fax, total , city, state)');
    });
} else {
    alert("WebSQL is not supported by your browser!");
}
//function to add 
function addManifacture() {

    //check to ensure the db object has been created
    if (db) {
        //get the values of the make and model text inputs
        var name = document.getElementById("inlineFormInputGroup").value;
        var email = document.getElementById("inputEmail").value;
        var mobile = document.getElementById("inputMobile").value;
        var phone = document.getElementById("inputPhone").value;
        var fax = document.getElementById("inputFax").value;
        var address = document.getElementById("inputAddress").value;//
        var city = document.getElementById("inputCity").value;//
        var state = document.getElementById("inputState").value;//
        var zip = document.getElementById("inputZip").value;//

        var total = address + " , " + city + " , " + state + " , " + zip;

        //Test to ensure that the user has entered both a make and model
        if (name !== "") {
            //Insert the user entered details into the medicene table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO manifcature (name, email, mobile, phone, fax, total , city, state) VALUES (?,?,?,?,?,?,?,?)',
                    [name, email, mobile, phone, fax, total , city, state])

            });
        } else {
            alert("You must enter the * field!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function updatemanifcatureList(transaction, results) {

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

        listholder.innerHTML += "<tr>" + "<td>" + row.name + " </td>" + "<td>" + row.total + " </td>" +
            "<td>" + row.mobile + "</td>" + "<td>" + row.phone + " </td>" + "<td>" + row.email + "</td>" +
            "<td>" + row.city +"</td>"+"<td>" + row.state +"</td>"+
            "<td>" + "<button type='button' class=' btn btn-sm' style='background-color: #028090;color: white;' title='update'>" +
            "<i class='bi bi-pencil-square'></i>" + "</button>" +
            "<a class='btn btn-danger btn-sm' href='javascript:void(0)' onclick='deletemanifcaturelist(" + row.id + ") ' role='button'   '><i class='bi bi-trash'></i></a>"
            + "</td>" + "</tr>";
    }
}

//function to get the list of cars from the database
function ouputmanifcatureList() {
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {
            tx.executeSql("SELECT id,name, total, mobile, phone, email , city, state FROM manifcature", [], updatemanifcatureList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function deletemanifcaturelist(id) {
    debugger
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM manifcature WHERE id=?", [id], ouputmanifcatureList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

ouputmanifcatureList();

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