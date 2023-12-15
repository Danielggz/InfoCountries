var countriesApi; //Global variable to store the API json information

$('document').ready(function(){
    $("#worldMap").load("../img/world.svg", function(){

        //Hover change color
        $("path").hover(function(){
            $(this).css({'fill': '#99d6f4'});
        },
        function(){
            $(this).css({'fill': '#ECECEC'});
        });

        $("path").click(function(elem){
            var className = $(this).attr('class');
            var name = $(this).attr("name");
            
            //change color of the clicked map
            $(this).css({'fill': '#0BACFF'});

            var countryName;
            //Most of the countries use id to identify themselves, but some with multiple territories (Russia, France) use class to identify each territory
            if(className === undefined){
                //Identified by class name
                countryName = name;
            }else if(name === undefined){
                //Identified by Id
                countryName = className;
            }

            //Correct wrong naming from the map to fit API naming requirements
            var arrayWrongNames = ["Ireland", "Republic of Congo", "Lao PDR", "Canary Islands (Spain)", "Dem. Rep. Korea", "Republic of Korea"];
            var arrayCorrections = ["Republic of Ireland", "Republic of the Congo", "Laos", "Spain", "North Korea", "South Korea"];
            if(arrayWrongNames.includes(countryName)){
                let index = arrayWrongNames.indexOf(countryName);
                countryName = arrayCorrections[index];
            }

            //Ajax call when map is ready
            $.ajax({
                type: 'GET',
                dataType:"json",
                url: 'https://restcountries.com/v3.1/name/' + countryName + "?fullText=true",
                success: function (data, status, xhr) {
                    var countryInfo = data[0];
                    console.log(countryInfo);
                    
                    //Set fields in div for info of the country
                    var flagLink = countryInfo.flags["png"];
                    var name = countryInfo.name["common"];
                    var capital = countryInfo.capital[0];
                    var population = countryInfo.population;
                    var region = countryInfo.region;
                    var currency = Object.values(countryInfo.currencies)[0]["name"]; //First value of the currencies list
                    var languages = countryInfo.languages;

                    $("#countryFlag").attr("src", flagLink);
                    $("#countryName").html(name);
                    $("#countryCapital").html(capital);
                    $("#countryPopulation").html(population);
                    $("#countryRegion").html(region);
                    $("#countryCurrency").html(currency);
                    $("").html(languages);

                }
            });
        });
    });


    
});

