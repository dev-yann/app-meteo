const wheatherIcons = {
// en accord avec la condition renvoyée

    "Rain" :"wi wi-day-rain",
    "Clouds":"wi wi-day-cloudy",
    "Clear":"wi wi-day-sunny",
    "Snow":"wi wi-day-snow",
    "mist":"wi wi-day-fog",
    "Drizzle":"wi wi-day-sleet"
}

function displayWeather(data){

    var name = data.name;
    var temp = data.main.temp;
    var conditions = data.weather[0].main;
    var desc = data.weather[0].description;

    document.getElementById('ville').textContent = name;
    document.querySelector('h2').textContent = temp + ' C° ';
    document.getElementById('condition').textContent = '(' + desc + ')';

    document.querySelector('i').className = wheatherIcons[conditions];

    console.log(data);
}

async function main(withIP = true){
    // si il n'y a pas de parametre, le parametre par default est withIP

    let ville;

    // recup l'ip de l'utilisateur : https://api.ipify.org?format=json
    // await permet d'obtenir la résolution de la promesse faite par fetch, pour utiliser await, la fonction doit etre async
    if(withIP){

        const ip = await fetch('https://api.ipify.org?format=json')
         .then(resultat => resultat.json())
         .then(json => json.ip);

        ville = await fetch('http://freegeoip.net/json/' + ip)
        .then(resultat => resultat.json())
        .then(json => json.city);
      

    } else {


        ville = document.querySelector('#ville').textContent;
           console.log(ville);
    }






    var meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+ville+'&APPID=708a1495188378fa508fb801af472b41&lang=fr&units=metric')
                .then (resultat => resultat.json())
                .then (json => json);





    // fetch renvoie une promesse, js promet qu'une fois fetch est fini, il execute then
    // apres then, on obtient l'objet response


    displayWeather(meteo);

}




// recup la ville grâce à l'ip : http://freegeoip.net/json/adresseIPdumec

// recup les infos météo grace à la ville : api openweathermap

const maville = document.querySelector('#ville');
maville.addEventListener('click',()=>{

    maville.contentEditable = true;


});

maville.addEventListener('keydown',(e) => {

    if(e.keyCode === 13){

        e.preventDefault();// ne vas pas à la ligne
        maville.contentEditable = false;
        main(false);
    }

});

main();
