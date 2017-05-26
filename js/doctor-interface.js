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
    $('#output').append(
      '<div class="col-md-5 card">'+
        '<div class="card-header">'+
          '<h1>'+ searchResult[j].firstName +" "+ searchResult[j].lastName +'</h1>'+
          '<p>'+ searchResult[j].specialtyName +'</p>'+
        '</div>'+
        '<div class="card-block">'+
          '<p class="card-text">'+ searchResult[j].specialtyDesc +'<p>'+
          '<p><span class="result-title">Accept New Patients: </span>'+ acceptsNewPatientsFormat +'</p>'+
          '<p><span class="result-title">Phone number: </span>'+ searchResult[j].phone +'</p>'+
          '<h4 class="card-title">Address</h4>'+
          '<p class="card-text">'+ searchResult[j].street +', '+ searchResult[j].city +', '+ searchResult[j].state+'-'+ searchResult[j].zipCode +'</p>'+
        '</div>'+
      '</div>'
    );
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
