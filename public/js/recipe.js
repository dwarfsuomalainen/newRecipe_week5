//const { allowedNodeEnvironmentFlags } = require("process");
let recipe_fetched = document.createElement('div');

if(document.readyState !== "loading") {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function(){init()});
}

function init(){
fetchPasta();


/*let page_h = document.createElement("h1");
page_h.innerHTML = '<h1>Recipes</h1>';
document.body.appendChild(page_h);

let namefromApi = document.createElement('h2');
namefromApi.innerText = 'namefromApiValue.name';
document.body.append(namefromApi);

let newRecipe = document.createElement('div');
newRecipe.id= "newRecipe";
document.body.appendChild(newRecipe);
let newRecipeDiv = document.getElementById('newRecipe');
let newRecipeHeader = document.createElement('h2');
newRecipeHeader.innerHTML = '<h2>Add your recipe</2>';
newRecipeDiv.appendChild(newRecipeHeader);
let newRecipeNameInput = document.createElement('input');
newRecipeNameInput.type = 'text';
newRecipeNameInput.id = 'name-text';
newRecipeDiv.appendChild(newRecipeNameInput);
let header4 = document.createElement('h4');
header4.innerHTML = '<h4>Ingredients</h4>';
newRecipeDiv.appendChild(header4);
let newRecipeIngrText = document.createElement('textarea');
newRecipeIngrText.id = 'ingredients-text';
newRecipeDiv.appendChild(newRecipeIngrText);
let newRecipeIngrAddB = document.createElement('button');
newRecipeIngrAddB.id ='add-ingredient';
newRecipeIngrAddB.innerText = 'Add ingredient';
newRecipeDiv.appendChild(newRecipeIngrAddB);
let header4_1 = document.createElement('h4');
header4_1.innerHTML = '<h4>Instructions</h4>';
newRecipeDiv.appendChild(header4_1);
let newRecipeInsText = document.createElement('textarea');
newRecipeInsText.id = 'instructions-text';
newRecipeDiv.appendChild(newRecipeInsText);
let newRecipeInsAddB = document.createElement('button');
newRecipeInsAddB.id ='add-instruction';
newRecipeInsAddB.innerText = 'Add instruction';
newRecipeDiv.appendChild(newRecipeInsAddB);
let newRecipePhoto = document.createElement('input');
newRecipePhoto.type= 'file';
newRecipePhoto.id= "image-input";
newRecipePhoto.accept= "image/png; image/jpeg";
newRecipeDiv.appendChild(newRecipePhoto);
let newRecipeSubmit = document.createElement('button');
newRecipeSubmit.id= "submit";
newRecipeSubmit.innerText = 'Submit';
newRecipeDiv.appendChild(newRecipeSubmit);*/

}
async function fetchPasta() {
let getPasta = await fetch('/recipe/pasta');
let recipePasta = await getPasta.json();
console.log(recipePasta);
let nameI = recipePasta.name;
let ingredientsI = recipePasta.ingredients;
let instructionsI = recipePasta.instructions;

toIndex(nameI, ingredientsI, instructionsI);
}
function toIndex(x,y,p) {
let recipeName = document.getElementById('recipename');
recipeName.innerHTML = x;
let recipeIngr = document.getElementById('reciepeIngredients');
recipeIngr.innerHTML = y;
let recipeInstr = document.getElementById('recipeInstructions');
recipeInstr.innerHTML = p;


}
//console.log(recipePasta[0].name);

let btn = document.getElementById("add-ingredient");
console.log(btn);
btn.addEventListener('click', addIngredient);

let ingrArr = [];
function addIngredient(){

    let RecipeIngredients = document.getElementById("ingredients-text");
    console.log(RecipeIngredients.value);
    if (RecipeIngredients.value === "") {return;}
    else
    {ingrArr.push(RecipeIngredients.value);
    RecipeIngredients.value = "";
    console.log(ingrArr);}


    /*for (let count = 0; count >= ingrArr.length; count++){ 
    let RecipeIngredients = document.getElementById("ingredients-text"+(count));
    console.log(RecipeIngredients.value)
    console.log(ingrArr);
    ingrArr.push(RecipeIngredients.value);
    if (ingrArr.length > 0) {
    if (RecipeIngredients.value === "") { console.log('empty string');}
        else {
        let addIngLine = document.getElementById('addIng');
        console.log(addIngLine);
        addIngLine.classList.add = 'materialize-textarea';
       let textarea1 = document.createElement('textarea')
       textarea1.setAttribute("id","ingredients-text"+ [ingrArr.length]);
       addIngLine.appendChild(textarea1);
    
       console.log(addIngLine);
       console.log(ingrArr); 
         }} else {return;}                            
        }
        
    
    //for (let count = 0; count < RecipeIngredients; count++){ }
  */




}

let btn2 = document.getElementById("add-instruction");
console.log(btn2);
btn2.addEventListener('click', addInstruction);

let insArr = [];
function addInstruction(){

    let RecipeInstructions = document.getElementById("instructions-text");
    console.log(RecipeInstructions.value);
    if (RecipeInstructions.value === "") {return;}
    else
    {insArr.push(RecipeInstructions.value);
    RecipeInstructions.value = "";
    console.log(insArr);}


    /*let RecipeInstructions = document.querySelector(".ins-newline"+[insArr.length]);
    console.log(RecipeInstructions.value);
    console.log(insArr);
    insArr.push(RecipeInstructions.value);
    if (insArr.length > 0) {
        if (RecipeInstructions.value === "") { console.log('empty string');}
            else { 
            console.log(insArr);
            let addIngLine1 = document.getElementById('addInst');
            console.log(addIngLine1);
            addIngLine1.classList.add = 'materialize-textarea';
           let textarea2 = document.createElement('textarea')
           textarea2.setAttribute('class','ins-newline'+ [insArr.length]);
           addIngLine1.appendChild(textarea2);
        
           console.log(addIngLine1);
           console.log(insArr); 
             }} else {return;}*/                   
}

let submitUpload = document.getElementById('submit');
submitUpload.addEventListener('click', uploadPhoto,);

async function uploadPhoto(){
  
let formData = new FormData();
let photos = document.getElementById('image-input');
let files = photos.files;
for (let img=0; img < files.length; img++) {
console.log(files);
formData.append("images", files[img]);
}
console.log(files);
await fetch('/images', {method: 'POST', body: formData});
console.log(formData);

//var upload = new FormData(photos);
}
document.getElementById("submit").addEventListener('click', async (event) => { event.preventDefault();
    
    let RecipeName = document.getElementById('name-text');
    console.log(ingrArr);
    console.log(insArr);
    const res = await fetch('/recipe/', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({name: RecipeName.value, ingredients: ingrArr, instructions: insArr})
    });
});