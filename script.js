const apiKey = 'hIbqxHBfAjWMpJR30TouCoKYEHIff21Fc4nOSdtd'
const baseUrl = 'https://developer.nps.gov/api/v1/parks'


//sample url : https://developer.nps.gov/api/v1/parks?stateCode=ny&api_key=hIbqxHBfAjWMpJR30TouCoKYEHIff21Fc4nOSdtd

function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

  return queryItems.join('&');

}

function getParks(search, limit=10){
  const params = {
    api_key : apiKey,
    stateCode: search,
    limit
  }

  const queryString = formatQueryParams(params);
  const getEndpoint = baseUrl + '?' + queryString;

  console.log(getEndpoint);

  fetch(getEndpoint)
  .then(response => {
    if (response.ok){
      return response.json();
    }
    throw new Error(response.statusTest);
  })
  .then(responseJson =>  displayData(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something Went Wrong: ${err.message}`);
  });
  }



function displayData(responseJson){

  //console.log(responseJson);
  $('#results-list').empty();

  $('#results').removeClass('hidden');
  
   for (let i = 0; i < responseJson.data.length; i++){
     //for (let y=0 ; y < responseJson.data[i].addresses.length; y++) {
       //console.log(responseJson.data[i].addresses[y]);

     //}
     //console.log(`responseJson.data[i].addresses[0])
     $('#results-list').append(`<li><h2> Park : ${responseJson.data[i].fullName}</h2>
     <p> Description : ${responseJson.data[i].description}<br> <span style="color:#8ebf42;"> URL : ${responseJson.data[i].url} </span></p> </li>`)
   
    
   }
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const search = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getParks(search, limit);
  })
}

watchForm();