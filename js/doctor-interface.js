var Doctor = require('./../js/doctor.js').doctorModule;


var displayResult = function(searchResult) {
  $('#output').text("");
  var acceptsNewPatientsFormat;

  for(var j=0;j<searchResult.length;j++){
    if(searchResult[j].acceptsNewPatients == true)
    {
      acceptsNewPatientsFormat = 'Yes';
    }
    else
    {
      acceptsNewPatientsFormat = 'No';
    }
    $('#output').append('<h4>'+ searchResult[j].firstName +" "+ searchResult[j].lastName +'</h4>'+
    '<p><span class="result-title">Accept New Patients: </span>'+ acceptsNewPatientsFormat +'</p>'+
    '<p><span class="result-title">Specialties: </span>'+ searchResult[j].specialtyName +'</p>'+
    '<p><span class="result-title">Description: </span>'+ searchResult[j].specialtyDesc +'</p>'+
    '<p><span class="result-title">Phone number: </span>'+ searchResult[j].phone +'</p>'+
    '<p><span class="result-title">Address: </span>'+ '</p>'+
    '<p>'+ searchResult[j].street +'</p>'+
    '<p>'+ searchResult[j].city +','+ searchResult[j].state+'-'+ searchResult[j].zipCode +'</p>');
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
