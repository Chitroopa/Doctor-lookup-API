var Doctor = require('./../js/doctor.js').doctorModule;


var displayResult = function(searchResult) {
  $('#output').text("");
  for(var j=0;j<searchResult.length;j++){
    $('#output').append('<h4>'+ searchResult[j]['firstName'] +" "+ searchResult[j]['lastName'] +'</h4>');
    $('#output').append('<p><span class="result-title">Specialties: </span>'+ searchResult[j]['specialtyName'] +'</p>');
  }
};

$('document').ready(function(){
  $('#form-one').submit(function(event){
    var userInputMedicalIssue = $('#medical-issue').val();
    $('#medical-issue').val("");

    console.log(userInputMedicalIssue);
    var newDoctorLookup = new Doctor();
    console.log(newDoctorLookup.getDoctors(userInputMedicalIssue, displayResult));
    // $("#output").text(newDino.getDino(displayDino));
    event.preventDefault();

  });
});
