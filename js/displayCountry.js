var countriesApi; //Global variable to store the API json information

$('document').ready(function(){
    $("#worldMap").load("../img/world.svg", function(){

        //Hide info and loading while is not loaded
        $("#infoCountry").hide();
        $("#loading").hide();

        //Hover change color
        $("path").hover(function(){
            $(this).css({'fill': '#0BACFF'});
        },
        function(){
            $(this).css({'fill': '#ECECEC'});
        });

        $("path").click(function(ev){
            //Set loading animation
            $("#loading").show();
            $("#loading").focus(); //Send focus to the loading
            var className = $(this).attr('class');
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
                    //Once data is loaded, hide loading animation and show and focus on the info
                    $("#loading").hide();
                    $("#infoCountry").show();
                    $("#infoCountry").focus();
                    var countryInfo = data[0];
                    console.log(countryInfo);
                    
                    //Set fields in div for info of the country
                    var flagLink = countryInfo.flags["png"];
                    var name = countryInfo.name["common"];
                    var capital = countryInfo.capital[0];
                    //Regex to add dots to every three digits (ex: 1.000)
                    var area = countryInfo.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " km²";
                    var population = countryInfo.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    var region = countryInfo.region;
                    var currency = Object.values(countryInfo.currencies)[0]["name"] + " - " + Object.values(countryInfo.currencies)[0]["symbol"]; //First value of the currencies list
                    var languages = countryInfo.languages;

                    $("#countryFlag").attr("src", flagLink);
                    $("#countryName").html(name);
                    $("#countryCapital").html(capital);
                    $("#countryPopulation").html(population);
                    $("#countryArea").html(area);
                    $("#countryRegion").html(region);
                    $("#countryCurrency").html(currency);
                    //restart table first and then append list
                    $("#countryLanguages").html("");
                    var list = $("<ol></ol>");
                    for(language in languages){
                        //append each lenguage to ordered list element
                        list.append("<li>" + languages[language] + "</li>")
                    }
                    $("#countryLanguages").append(list);
                }
            });
        });

        $("#btnGotoMap").click(function(){
            //hide info to go back to map in scroll
            $("#infoCountry").hide();
        });
    });


    
});

