var config = {
    apiKey: "AIzaSyDJthCFOEP70jDKdBBL-nYdAP_ETrAaNr4",
    authDomain: "alexyoungbcs.firebaseapp.com",
    databaseURL: "https://alexyoungbcs.firebaseio.com",
    projectId: "alexyoungbcs",
    storageBucket: "alexyoungbcs.appspot.com",
    messagingSenderId: "767487253451"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    console.log(firstTrain);
    var freq = $("#frequency-input").val().trim();
     
    var addTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrain,
        freq: freq,
    }

    database.ref().push(addTrain);    
  
    alert("train successfully added");
  
    // Clears all of the text-boxes after train added
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#freq-input").val("");
  });
  
  
  database.ref().on("child_added", function(childSnapshot) {
  
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var freq = childSnapshot.val().freq;
  
      
    var firstTrainTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    var tRemainder = diffTime % freq;
    var tMinutesTillTrain = freq - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainTime = moment(nextTrain).format("hh:mm a");
 
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(freq),
      $("<td>").text(nextTrainTime),
      $("<td>").text(tRemainder),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });