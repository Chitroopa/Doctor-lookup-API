var apiKey = require('./../.env').apiKey;
var googleApiKey = require('./../.env').googleApiKey;

function Doctor() {

}

Doctor.prototype.getDoctors = function(medicalIssue, city, displayResult, clearResult) {
  var doctorDetails = {};
  var searchResult = [];
  var latitude, longitude, searchCity;

  $.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=+in+'+ city +'&key=' + googleApiKey)
  .then(function(response) {

    latitude = parseFloat((response.results[0].geometry.location.lat).toFixed(3));
    longitude = parseFloat((response.results[0].geometry.location.lng).toFixed(3));
    searchCity = response.results[0].formatted_address;
    console.log(searchCity);

    $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location='+latitude+'%2C%20'+longitude+'%2C%2010&user_location='+ latitude+'%2C%20'+longitude+'&skip=0&limit=20&user_key=' + apiKey)
   .then(function(response) {
     console.log(response);
      var resultCount = response.data.length;
      if (resultCount > 0)
      {
        for(var i=0; i<resultCount; i++)
        {
          var addressArray = [];
          var addressformat ="";
          var specialty, description;
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
          if (response.data[i].specialties === undefined)
          {
            console.log(response.data[i]);
            specialty = 'General';
            description = 'General';
          }
          else
          {
            specialty = response.data[i].specialties[0].actor;
            description = response.data[i].specialties[0].description;
          }
          var addressArraysorted = Array.from(new Set(addressArray));

          doctorDetails = {firstName: response.data[i].profile.first_name,lastName: response.data[i].profile.last_name,specialtyName: specialty,specialtyDesc: description,acceptsNewPatients: response.data[i].practices[0].accepts_new_patients,address: addressArraysorted, img: response.data[i].profile.image_url, bio: response.data[0].profile.bio };
          console.log(doctorDetails);
          searchResult.push(doctorDetails);
          doctorDetails = {};
        }
        displayResult(searchResult, searchCity);
      }
      else
      {
        $('#output').text("No results found, try with different key word");
      }
    })
   .fail(function(error){
     debugger;
      $('#output').text(error.responseJSON.message);
    });
  })
  .fail(function(error){
    $('#output').text(error.responseJSON.message);
  });
};


exports.doctorModule = Doctor;
