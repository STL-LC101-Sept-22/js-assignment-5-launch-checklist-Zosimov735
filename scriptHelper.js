// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTxt = document.getElementById("missionTarget");
    missionTxt.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
                 `;
 }


function validateInput(testInput) {
   console.log(testInput)
    let input = Number(testInput)
   if (testInput === ""){
    return "Empty"
   } else if(isNaN(input)===false){
    return "Is a number"
   } else if(isNaN(input)===true){
    return "Not a number"
   }
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
let fuel = document.getElementById("fuelStatus");
   let cargo = document.getElementById("cargoStatus");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let launchStatus = document.getElementById("launchStatus")

   console.log(pilot, copilot, cargoLevel, fuelLevel)
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty" ){
        alert("All fields are required, please enter a value for everything")
   }
   else if (validateInput(pilot) === "Is a number" || validateInput(copilot) === "Is a number" || validateInput(fuelLevel) === "Not a number" || validateInput(cargoLevel) === "Not a number"){
       alert("Enter valid values for the fields")
   }
   else { 
    list.style.visibility = "visible"
    pilotStatus.innerHTML = `Captain pilot ${pilot} is ready for launch`
    copilotStatus.innerHTML = `Co-Captain ${copilot} is ready for launch`   

        if (parseInt(fuelLevel) < 10000 && parseInt(cargoLevel) <= 10000){
        launchStatus.style.color = "red"
        launchStatus.innerHTML = "Shuttle not ready for launch" 
        fuel.innerHTML = "NOT ENOUGH FUEL, GET SOME GAS"
        cargo.innerHTML = "Get on out there space cowboy"
}   
        else if(parseInt(fuelLevel) >= 10000 && parseInt(cargoLevel) > 10000){
            launchStatus.style.color = "red"
            launchStatus.innerHTML = "Shuttle not ready for launch" 
            fuel.innerHTML = "Plenty of fuel, space cowboy"
            cargo.innerHTML = "TOO MUCH MASS, LESS MASS NEEDED TO LAUNCH"
        }
        else if(parseInt(fuelLevel) < 10000 && parseInt(cargoLevel) > 10000){
            fuel.innerHTML = "Gotta get some gas, space cowboy"
            cargo.innerHTML = "TOO MUCH MASS, LOSE MASS FOR LAUNCH"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
        }
        else{
            launchStatus.style.color = "green"
            launchStatus.innerHTML = "Shuttle ready to launch"
            fuel.innerHTML = "Get on out there"
            cargo.innerHTML = "Get on out there"
        }
}
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
         return response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
 return planets[Math.floor(Math.random() * planets.length)]  
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
