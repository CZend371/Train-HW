var firebaseConfig = {
    apiKey: "AIzaSyCpIf9IhPwK0P84EkrDEkzs7pZ8YT3snYk",
    authDomain: "trainproject371.firebaseapp.com",
    databaseURL: "https://trainproject371.firebaseio.com",
    projectId: "trainproject371",
    storageBucket: "trainproject371.appspot.com",
    messagingSenderId: "541410496348",
    appId: "1:541410496348:web:77163ef95a646a97"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var train = null;
var destination = null;
var trainTime = null;
var frequency = null;

$("#add-train").click(function () {
    event.preventDefault();

    train = $("#train-name").val().trim();
    console.log(train);
    destination = $("#destination").val().trim();
    console.log(destination);
    trainTime = $("#train-time").val().trim();
    console.log(trainTime);
    frequency = $("#frequency").val().trim();
    console.log(frequency);

    database.ref().push({
        trainName: train,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
    // adds trains to table
    $("#train-table > tbody").append(
        $("<tr>").append(
            $("<td>").text(train),
            $("<td>").text(destination),
            $("<td>").text(frequency)
            // $("<td>").text(tArrival),
            // $("<td>").text(tMinutes)
        )
    );
    clearForm();

})

var clearForm = function () {
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
}