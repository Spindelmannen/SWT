class Character {
    constructor(name, gender, height, mass, hair_color, pictureURL){
        this.pictureURL = pictureURL
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.mass = mass;
        this.hairColor = hair_color;
        
    }
    //method func's
    // scanMass(opponent){

        
    //     let massDiff =  (this.mass - opponent.mass);
    //     console.log(massDiff);
    //   }
}


let infoBtn = document.getElementById('characterInfo');

let dropDown1 = document.getElementById('dropdown1');
let dropDown2 = document.getElementById('dropdown2');

let chosenCharacters = document.querySelector(".characterList");

let characterCard1 = document.querySelector(".characterCard1");
let characterCard2 = document.querySelector(".characterCard2");
let main = document.querySelector(".main");
let spy1 = document.querySelector(".spy1");
let spy2 = document.querySelector(".spy2");
let heightPara = document.querySelector(".heightPara");
let massPara = document.querySelector(".massPara");

let restart = document.querySelector('.restart');
let compareBTN = document.getElementById('compareBTN');
// let massBTN1 = document.getElementById('opponentMass1');
// let heightBTN1 = document.getElementById('opponentHeight1');
// let hairBTN1 = document.getElementById('opponentHaircolor1');
// let genderBTN1 = document.getElementById('opponentGender1');

// let massBTN2 = document.getElementById('opponentMass2');
// let heightBTN2 = document.getElementById('opponentHeight2');
// let hairBTN2 = document.getElementById('opponentHaircolor2');
// let genderBTN2 = document.getElementById('opponentGender2');

let selectedCharacter1 = dropDown1.value;
let selectedCharacter2 = dropDown2.value;
let character1Data = [];
let character2Data = [];

let firstPerson;
let secondPerson;
infoBtn.addEventListener('click',(e) => {
    e.preventDefault()
    main.style.display = "none";
    console.log(dropDown1.value);
    console.log(dropDown2.value);
    
    // massBTN1.addEventListener('click', (e) => {
    //     e.preventDefault()
    //     firstPerson.scanMass(secondPerson);
    // });
    
    // massBTN2.addEventListener('click', (e) => {
    //     e.preventDefault()
    //     secondPerson.scanMass(firstPerson);
    //     console.log(secondPerson.scanMass(firstPerson));
    // });
    
    
    
    //////////////////////ASYNC//////////////ASYNC//////////////////////ASYNC/////////////////////////////////////////////
    const fetchData = async (url) => {
        let response = await fetch(url);
        let json = await response.json();
        return json;
    };
    
    //en async funktion som ska rendera ut karaktär1 / specifik data från api när vi kallar på den.
    const renderPerson = async () => {
        let getCharacter1 = await fetchData(`https://swapi.dev/api/people/${dropDown1 ? + dropDown1.value : null}`);
    console.log(getCharacter1, ' hämtar med fetch');
    
    
    //de-structuring
    let { name, gender, height, mass, hair_color, pictureURL } = getCharacter1;
    console.log(getCharacter1, 'destructed');
    
     character1Data.push({name}, {gender}, {height}, {mass}, {hair_color});
    // console.log(character1Data, 'DATA');
    
    //stylear & appendar content
    pictureURL=`./img/${dropDown1.value}.jpg`;
    console.log(pictureURL,'FIRST persons image');
    //stylear & appendar content
    characterCard1.style.backgroundImage = `url('${pictureURL}')`;
    characterCard1.style.backgroundPosition = "center"
    characterCard1.style.backgroundSize = "cover"
    characterCard1.innerHTML = `
    <p>${name}</p>
    <p hidden>Height:${height}cm</p>
    <p hidden>Mass:${mass}kg</p>
    `;
    
    //skapar en ny karaktär med class
    let firstPerson = new Character(name, gender, height, mass, hair_color, pictureURL);
    console.log(firstPerson,'detta är första character class');
 
    };
    //en async funktion som ska rendera ut karaktär2 / specifik data från api när vi kallar på den.
    const renderNextPerson = async () => {
        let getCharacter2 = await fetchData(`https://swapi.dev/api/people/${dropDown2 ? + dropDown2.value : null}`);
    console.log(getCharacter2, 'hämtar med fetch');
    
    //de-structuring
    let { name, gender, height, mass, hair_color, pictureURL } = getCharacter2;
    console.log(getCharacter2, 'destructed');
    
    character2Data.push({name}, {gender}, {height}, {mass}, {hair_color});
    // console.log(character2Data, 'DATA');
    
    //stylear & appendar content
    pictureURL=`./img/${dropDown2.value}.jpg`;
    console.log(pictureURL,'Nextpersons image');
    //stylear & appendar content
    characterCard2.style.backgroundImage = `url('${pictureURL}')`;
    characterCard2.style.backgroundPosition = "center"
    characterCard2.style.backgroundSize = "cover"
    characterCard2.innerHTML = `
    <p>${name}</p>
    <p hidden>Height:${height}cm</p>
    <p hidden>Mass:${mass}kg</p>
    `;
    
    //skapar en ny karaktär med class
    let secondPerson = new Character(name, gender, height, mass, hair_color, pictureURL);
    console.log(secondPerson,'detta är andra character class');
    
};

//renderar ut hämtad data från API
renderPerson()
renderNextPerson()

spy1.removeAttribute("hidden");

compareBTN.addEventListener('click', (e) =>  {
    e.preventDefault();
    spy1.innerHTML = `
    <p>${character1Data[0].name}'s Gender: ${character1Data[1].gender}</p>
    <p>${character1Data[0].name}'s Height: ${character1Data[2].height}CM</p>
    <p>${character1Data[0].name}'s Mass: ${character1Data[3].mass}KG</p>
    <p>${character1Data[0].name}'s Haircolor: ${character1Data[4].hair_color}</p>
    <br>
    <p>${character2Data[0].name}'s Gender: ${character2Data[1].gender}</p>
    <p>${character2Data[0].name}'s Height: ${character2Data[2].height}CM</p>
    <p>${character2Data[0].name}'s Mass: ${character2Data[3].mass}KG</p>
    <p>${character2Data[0].name}'s Haircolor: ${character2Data[4].hair_color}</p>
    `;

    spy2.removeAttribute("hidden");
    
    if (parseInt(character1Data[2].height) == parseInt(character2Data[2].height)){
        heightPara.innerHTML = `
        <p>when it comes to height${character1Data[0].name} and ${character2Data[0].name} are identical twins!</p>
        `;
    }else if(parseInt(character1Data[2].height) > parseInt(character2Data[2].height)){
        heightPara.innerHTML = `
        <p>${character1Data[0].name} is Standing Taller than ${character2Data[0].name}!</p>
        `;
    }else{
        heightPara.innerHTML = `
        <p>${character1Data[0].name} is shorter than ${character2Data[0].name}s long neck!</p>
        `;
    }
    
    if (parseInt(character1Data[3].mass) == parseInt(character2Data[3].mass)){
        massPara.innerHTML = `
        <p>Both ${character1Data[0].name} and ${character2Data[0].name} got the same amount of mass.</p>
        `;
    }else if (parseInt(character1Data[3].mass) > parseInt(character2Data[3].mass)){
    massPara.innerHTML = `
    <p>${character1Data[0].name} is standing heavier on the ground compared to ${character2Data[0].name} who's almost flying!</p>
    `;
    }else{
        massPara.innerHTML = `
        <p>${character1Data[0].name} can feel the gravity of ${character2Data[0].name} huuuge mass!</p>
        `;
    }
    restart.removeAttribute("hidden");
    restart.addEventListener('click', () =>{
        window.location.reload();
    });

});
console.log(character1Data, 'DATA');
console.log(character2Data, 'DATA');
});