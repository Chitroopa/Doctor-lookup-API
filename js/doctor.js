var apiKey = require('./../.env').apiKey;

function Doctor() {

}

Doctor.prototype.getDoctors = function(medicalIssue, displayResult) {
  var doctorDetails = {};
  var searchResult = [];

  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=47.676%2C-122.205%2C%2010&user_location=47.676%2C-122.205&skip=0&limit=20&user_key=' + apiKey)
 .then(function(response) {
    var resultCount = response.data.length;
    if (resultCount > 0)
    {

      for(var i=0; i<resultCount; i++)
      {
        doctorDetails = {firstName: response.data[i].profile.first_name,lastName: response.data[i].profile.last_name,specialtyName: response.data[i].specialties[0].actor,specialtyDesc: response.data[i].specialties[0].description,acceptsNewPatients: response.data[i].practices[0].accepts_new_patients,phone: response.data[i].practices[0].phones[0].number,street: response.data[i].practices[0].visit_address.street,city: response.data[i].practices[0].visit_address.city,state: response.data[i].practices[0].visit_address.state,zipCode: response.data[i].practices[0].visit_address.zip};
        searchResult.push(doctorDetails);
        doctorDetails = {};
      }
      console.log(searchResult);
      console.log(searchResult.length);
      displayResult(searchResult);
    }
    else
    {
      $('#output').text("No results found, try with different key word");
    }
  })
 .fail(function(error){
    console.log("fail");
  });
};


exports.doctorModule = Doctor;
