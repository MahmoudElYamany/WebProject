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
}
//expire notification
db.transaction(function (tx) {
    tx.executeSql('select expiredate from Medicine',
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


function updatestockList(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("datastock");
    //clear cars list ul
    listholder.innerHTML = "";
    //Iterate through the results
    for (var i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);
        

        listholder.innerHTML += "<tr>" + "<td>" + row.id + " </td>" + "<td>" + row.medicineName + " </td>" +
            "<td>" + row.manufucturer + "</td>" + "<td>" + row.Medicinetype + " </td>" + "<td>" + row.Price + "</td>" +
            "<td>" + row.Quantity + " </td>" +"<td> 0 </td>" +"<td>" + row.Quantity + " </td>" + "<td> $3,325.00 </td>" + "<td> $2,850.00 </td>" +
            "</tr>";
    }
}

//function to get the list of cars from the database
function outputstocklist() {
    
    //check to ensure the db object has been created
    if (db) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        db.transaction(function (tx) {
            tx.executeSql("SELECT id, Quantity, medicineName ,manufucturer , Price FROM Medicine", [], updatestockList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}
outputstocklist();