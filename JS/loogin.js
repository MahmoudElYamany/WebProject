if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var db = openDatabase('pharmacy', '1.0', 'Test DB', 2 * 1024 * 1024);
} else {
    alert("WebSQL is not supported by your browser!");
}

var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {debugger
    var username = document.getElementById("first_name").value;
    var password = document.getElementById("password").value;
    
    if(document.getElementById("radio").checked == true){var radio = "Manger";}
    else{var radio = "Pharmasist";}
    
    console.log(username,password,radio);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM staff', [], function (tx, results) {
               
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i)
                if (row.name == username && row.Designation == radio && radio =="Manger"){
                    window.location = "dashhhh.html"; // Redirecting to other page.
                }  
                if (row.name == username && row.Designation == radio && radio == "Pharmasist"){
                    window.location = "userdash.html"; // Redirecting to other page.
                }  
            }
        
        }, null);
    });
}
