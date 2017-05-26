var apiKey = require('./../.env').apiKey;

function Doctor() {

}

Doctor.prototype.getDoctors = function(medicalIssue, displayResult) {
  var doctorDetails = {};
  var searchResult = [];

  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=47.606%2C-122.332%2C%2010&user_location=47.606%2C-122.332&skip=0&limit=20&user_key=' + apiKey)
 .then(function(response) {
    var resultCount = response.data.length;
    if (resultCount > 0)
    {

      for(var i=0; i<resultCount; i++)
      {
        var addressArray = [];
        var addressformat ="";
        var addressCount = response.data[i].practices.length;
        if(addressCount > 0)
        {
          for(var k=0; k<addressCount; k++) {
            addressformat = (response.data[i].practices[k].visit_address.street + ", " + response.data[i].practices[k].visit_address.city + ", " + response.data[i].practices[k].visit_address.state + "-" + response.data[i].practices[k].visit_address.zip);
            addressArray.push(addressformat);
          }
        }
        else
        {
          addressformat = (response.data[i].practices[0].visit_address.street + ", " + response.data[i].practices[0].visit_address.city + ", " + response.data[i].practices[0].visit_address.state + "-" + response.data[i].practices[0].visit_address.zip);
          addressArray.push(addressformat);
        }
        var addressArraysorted = Array.from(new Set(addressArray));
        // console.log(addressArray);
        // console.log(addressArraysorted);
        doctorDetails = {firstName: response.data[i].profile.first_name,lastName: response.data[i].profile.last_name,specialtyName: response.data[i].specialties[0].actor,specialtyDesc: response.data[i].specialties[0].description,acceptsNewPatients: response.data[i].practices[0].accepts_new_patients,phone: response.data[i].practices[0].phones[0].number,address: addressArraysorted};
        searchResult.push(doctorDetails);
        doctorDetails = {};
      }
      // console.log(searchResult);
      // console.log(searchResult.length);
      displayResult(searchResult);
    }
    else
    {
      $('#output').text("No results found, try with different key word");
    }
  })
 .fail(function(error){
    $('#output').text(error.responseJSON.message);
  });
};


exports.doctorModule = Doctor;
