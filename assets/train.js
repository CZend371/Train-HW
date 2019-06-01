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

    // take input from first train time & frequency and write function to do the math
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var minUntilTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minUntilTrain);

    // Next Train
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

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
            $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minUntilTrain)
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