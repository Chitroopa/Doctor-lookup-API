var Doctor = require('./../js/doctor.js').doctorModule;

var clearResult = function() {
  $('#output').text("");
};

var displayResult = function(searchResult, city) {
  $('#output').text("");
  var acceptsNewPatientsFormat;

  $('#output').append('<h3>Below doctors are availabe near location '+city+'</h3>');
  for(var j=0;j<searchResult.length;j++){
    var doctorAddress = "";
    if(searchResult[j].acceptsNewPatients === true)
    {
      acceptsNewPatientsFormat = 'Yes';
    }
    else
    {
      acceptsNewPatientsFormat = 'No';
    }

    for(var count=0; count<searchResult[j].address.length; count++) {
      doctorAddress = doctorAddress +  '<p class="card-text">'+ searchResult[j].address[count] +'</p>';
    }

    $('#output').append(
      '<div class="col-md-10 card">'+
        '<div class="card-header">'+
          '<h1>'+ searchResult[j].firstName +" "+ searchResult[j].lastName +'</h1>'+
          '<p>'+ searchResult[j].specialtyName +'</p>'+
          '<p class="card-text">'+ searchResult[j].specialtyDesc +'<p>'+
          '<img src="'+ searchResult[j].img+ '" />'+
        '</div>'+
        '<div class="card-block">'+
          '<p><span class="result-title">Bio: </span>'+ searchResult[j].bio +'</p>'+
          '<p><span class="result-title">Accept New Patients: </span>'+ acceptsNewPatientsFormat +'</p>'+
          '<h4 class="card-title">Address</h4>'+
          '<p>'+ doctorAddress +'</p>'+
        '</div>'+
      '</div>'
    );
  }
};

$('document').ready(function(){
  $('#form-one').submit(function(event){
    var userInputMedicalIssue = $('#medical-issue').val();
    var userCity = $('#city').val();
    $('#medical-issue').val("");
    $('#city').val("");
    var newDoctorLookup = new Doctor();
    clearResult();
    newDoctorLookup.getDoctors(userInputMedicalIssue,userCity,displayResult);
    event.preventDefault();
  });
});
