
//slide bar
$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
});
//cavans viddeo
var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#showscreenshot");
var img = document.querySelector("#showscreenshotimg");
var image64;
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.log(error.msg);
        });
}

function takescreenshot() {
    //Other browsers will fall back to image/png
    image64 = canvas.toDataURL();
    $("#done").fadeIn(function () {
        $(this).text("Done ✔")
    });
}

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
        tx.executeSql('CREATE TABLE IF NOT EXISTS staff (id INTEGER PRIMARY KEY ASC, name, gender,blood,mobile,Phone,email,total,Designation,Ratetype,Salary,image)');
    });
} else {
    alert("WebSQL is not supported by your browser!");
}
//function to add 
function addstaff() {

    //check to ensure the db object has been created
    if (db) {
        debugger;
        //get the values of the make and model text inputs
        var name = document.getElementById("inlineFormInputGroup").value;//
        var gender = document.getElementById("inputGender").value;//
        var blood = document.getElementById("inputBlood").value;//
        var image = image64;////
        var address = document.getElementById("inputAddress").value;
        var mobile = document.getElementById("inputMobile").value;//
        var Phone = document.getElementById("inputPhone").value;//
        var email = document.getElementById("inputEmail").value;//
        var city = document.getElementById("inputCity").value;
        var state = document.getElementById("inputState").value;
        var zip = document.getElementById("inputZip").value;
        var total = address + " , " + city + " , " + state + " , " + zip;//
        var Designation = document.getElementById("inputDesignation").value;
        var Ratetype = document.getElementById("inputrate").value;
        var Salary = document.getElementById("inputslary").value;


        //Test to ensure that the user has entered both a make and model
        if (name !== "" && mobile !== "") {
            //Insert the user entered details into the medicene table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO staff (name, gender,blood,mobile,Phone,email,total,Designation,Ratetype,Salary,image) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                    [name, gender, blood, mobile, Phone, email, total, Designation, Ratetype, Salary,image])

            });
        } else {
            alert("You must enter the * field!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function updatestaffList(transaction, results) {

    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("datastaff");
    //clear cars list ul
    listholder.innerHTML = "";
    //Iterate through the results
    for (var i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<tr>" + "<td>" + row.id + " </td>" + "<td>" + row.name + " </td>" +
            "<td>" + row.Designation + "</td>" + "<td>" + row.mobile + " </td>" + "<td>" + row.Phone + "</td>" +
            "<td>" + row.email +
            "<td>" + "<button type='button' class=' btn btn-sm' style='background-color: #028090;color: white;' title='update'>" +
            "<i class='bi bi-pencil-square'></i>" + "</button>" +
            "<a class='btn btn-danger btn-sm'  role='button'  onclick='deletestafflist(" + row.id + ")'><i class='bi bi-trash'></i></a>"
            + "</td>" + "</tr>";
    }
}

//function to get the list of cars from the database
function ouputstaffList() {
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {
            tx.executeSql("SELECT id , name, Designation,mobile,Phone,email FROM staff", [], updatestaffList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function deletestafflist(id) {
    debugger
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {debugger
            tx.executeSql("DELETE FROM staff WHERE id=?", [id], ouputstaffList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

ouputstaffList();

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