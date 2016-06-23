"use strict";     // FALTA ITERACIÓN 3 Y DEL BONUS, HACER LA FUNCIÓN PARA SALVAR EL POKEMON EN UN ARRAY

var name = $(".name");
var types = $(".types");
var description = $(".description");
var textBox;
var arrayPokemons = [];
var pokemonUrl;
var savedPokemons = [];

$("#searchById").on("click", function(e){
    e.preventDefault();
    textBox = $("#textBox").val();
    searchPokemon();
    $("#textBox").val("");
}); //cierre de onclick

$("#searchType").on("click", function(e){
    e.preventDefault();
    textBox = $("#textBox").val();
    searchType();
    $("#textBox").val("");
}); //cierre de onclick

$("#clearAll").on("click", function(e){
    e.preventDefault();
    clearAll();
}); //cierre de onclick

$("#savePokemon").on("click", function(e){
    e.preventDefault();
    savePokemon();
}); //cierre de onclick

function searchOnEnter(e){
   e = e || window.event;
   if (e.keyCode == 13)
   {
       textBox = $("#textBox").val();
       searchPokemon();
       return false;
   }
   return true;
};

function ajaxRequest(url, func1, func2){
  $.ajax({
            url: url, 
            dataType:"json",
            beforeSend:func1,
        }).done(func2)
          .fail(failFunction);
}

//api v2
function searchPokemon(){
  var searchPokemonUrl = "http://pokeapi.co/api/v2/pokemon/" + textBox;
  var searchPokemonLog = function(){console.log("searching pokemon")};

  ajaxRequest(searchPokemonUrl, searchPokemonLog, successFunctionSearchPokemon);
};    

// api v2
function successFunctionSearchPokemon(data){
    var types = data.types[0].type.name;
    var imgUrl = data.sprites.front_default;
    if (data.types.length != 1) {
        types = data.types[0].type.name + ", " + data.types[1].type.name;
    }
    var pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    var card = "<div class='card'>" + "<div>" + "<h2 class='name'>" + pokemonName + "</h2>" 
    + "<img src=" + imgUrl +">"
    + "<p class='types'>Types: " + types + "</p>" + "<p class='weight-height'>Weight: " + data.weight 
    + ". Height: " + data.height + "</p>" + "</div>"
    $("body div.cards").append(card);
};


function failFunction(request, textStatus, errorThrown) {
    alert("An error occurred during your request: " + request.status + " " + textStatus + " " + errorThrown);
};

//api v2
function searchType(){
    var typeUrl = "http://pokeapi.co/api/v2/type/" + textBox;
    var typeLog = function(){console.log("searching type")};
    ajaxRequest(typeUrl, typeLog, successFunctionSearchType)
};

function successFunctionSearchType(data){
    var i;
    var j;
    var successTypeLog = function(){console.log("type found")}    
    for (i=0; i<10; i++) {
      arrayPokemons.push(data.pokemon[i].pokemon);
    }

    for (j = 0; j < arrayPokemons.length ; j++) {
      pokemonUrl = arrayPokemons[j]["url"];
      ajaxRequest(pokemonUrl, successTypeLog, successFunctionSearchPokemon);
    }    
};

function clearAll(){
  $("body div.cards").empty();
}

/*
function savePokemon(){

}
*/

