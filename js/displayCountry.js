var countriesApi; //Global variable to store the API json information

$('document').ready(function(){
    //Ajax call when document is ready
    $.ajax({
        type: 'GET',
        dataType:"json",
        url: 'https://restcountries.com/v3.1/all',
        success: function (data, status, xhr) {
            console.log('data: ', data);
        }
    });
});
