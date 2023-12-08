var countriesApi; //Global variable to store the API json information

$('document').ready(function(){
    $("#worldMap").load("../img/world.svg", function(){

        $("path").click(function(ev){
            var className = $(this).attr('class')
            var name = $(this).attr("name");

            var countryName;
            //Most of the countries use id to identify themselves, but some with multiple territories (Russia, France) use class to identify each territory
            if(className === undefined){
                //Identified by class name
                countryName = name;
            }else if(name === undefined){
                //Identified by Id
                countryName = className;
            }

            //Ajax call when map is ready
            $.ajax({
                type: 'GET',
                dataType:"json",
                url: 'https://restcountries.com/v3.1/name/' + countryName,
                success: function (data, status, xhr) {
                    var countryInfo = data[0];
                    console.log(countryInfo);
                }
            });
        });
    });


    
});

