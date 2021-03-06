

let recipe_fetched = document.createElement('div');

if(document.readyState !== "loading") {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function(){init()});
}

function init(){
fetchPasta();
fetchCategory();


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
let nameI = (recipePasta.name);
//console.log(nameI);
let ingredientsI = recipePasta.ingredients;
let instructionsI = recipePasta.instructions;
let imagesI = recipePasta.images;
//console.log(imagesI);
toIndex(nameI, ingredientsI, instructionsI);
} 

function toIndex(x,y,p,k) {
let recipeName = document.getElementById('recipename');
recipeName.innerHTML = x;
let recipeIngr = document.getElementById('reciepeIngredients');
recipeIngr.innerHTML = y;
let recipeInstr = document.getElementById('recipeInstructions');
recipeInstr.innerHTML = p;
let imagesToIndex = document.getElementById('images');
console.log(imagesToIndex);
console.log(k);
//imagesToIndex.appendChild(k);
}


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
}





//var upload = new FormData(photos);


// this function creates list of id's of categories for the POST new recipe
    let categories = [];
    function checked() {
    let boxes = document.querySelectorAll('.checkbox');
    console.log(boxes);
    for (let i=0; i< boxes.length; i++ ) {
        if (boxes[i].checked === true) { 
            console.log(categories);
            let value1 = boxes[i].id;
            categories.push(value1);
        console.log(categories); }
             else {console.log("not checked");}
    }
}

// Search a recipe in a DB
let bar = document.getElementById('search');
bar.addEventListener('keypress', function(k){
if (k.key === 'Enter')
{
    console.log(bar.value);
    let c = bar.value;
    k.preventDefault();
    search(c);
    bar.value = "";
    let del = document.getElementById('images');
    del.innerHTML = "";
}
});
async function search(food){
let findRecipe = await fetch('/recipe/'+ food, {
    method: "GET",
    headers: {'content-type': 'application/json'}})
    .then(response => response.json());
    console.log(findRecipe);
    console.log(findRecipe.images);

let imagefromDB = (findRecipe.images);  // getting image id from db
let b = fetchPhotoFromDB(imagefromDB);
toIndex(findRecipe.name,findRecipe.ingredients,findRecipe.instructions,b);
b="";
}

//Fetching photo from db
async function fetchPhotoFromDB(idFromSearch){
    console.log(idFromSearch);
    let dbToDiv = document.getElementById("images");
    for (i = 0; i < idFromSearch.length; i++){
                    let imgX = document.createElement("img");
                    imgX.src= '/images/' + idFromSearch;
                    dbToDiv.appendChild(imgX);      
    }
    
}

//let submitUpload = document.getElementById('submit');
//submitUpload.addEventListener('click', uploadPhoto);
let imagesArr = [];
async function uploadPhoto(){
let formData = new FormData();
let photos = document.getElementById('camera-file-input');
let files = photos.files;

for (let img=0; img < files.length; img++) {
console.log(files);
formData.append('camera-file-input', files[img]);
//imagesArr.push(files[img]._id);
}
console.log(files);
let ImagesIds = await fetch('/images', {method: 'POST', body: formData})
.then(response => response.json())
console.log(ImagesIds);
console.log(ImagesIds[0]);
console.log(files.length);
for (i=0; i < files.length; i++) {
imagesArr.push(ImagesIds[i]);
console.log(imagesArr);
}
for (const valueFormdata of formData.values()) { 
    console.log(valueFormdata);}
}
// Categories 

// this function disables other checkboxes if one is picked
/*function disableCheckBox(catName){
    console.log("Checkbox disabled")
    let nameCat = document.getElementsByName(catName.name)
    let checked = document.getElementById(catName.id)

    if (checked.checked) {
        for(let i=0; i < nameCat.length; i++){
            if(!nameCat[i].checked){
                nameCat[i].disabled = true;
            }else{
                nameCat[i].disabled = false;
            }
        }
    }
    else {
        for(let i=0; i < nameCat.length; i++){
            nameCat[i].disabled = false;
        }
    }
}*/

async function fetchCategory() {

    let categoryRec = await fetch('/category/',{
        method: "GET",
        headers: {'content-type': 'application/json'}})
        .then(response => response.json());
    //let catJson = categoryRec.json();
    //console.log(catJson);
    console.log(categoryRec);
    //for (let i=0; i < categoryRec.length; i++) {
        for (var count in categoryRec) {
        let catChk = document.getElementById("catForm");
        console.log(catChk);
        let pCat = document.createElement("p");
        let lbl = document.createElement("label");
        let chkBox = document.createElement('input');
        chkBox.type="checkbox";
        chkBox.classList.add("checkbox");
        chkBox.name="category";
        chkBox.id=categoryRec[count]._id;
        //chkBox.id = "cat"+[count];
        //let idCat = categoryRec[count]._id;
        //console.log(idCat);
        
        
        /*chkBox.addEventListener("change", (event) => {
            if (chkBox.checked) { categories.push(idCat).value;
                console.log(categories);
            } else {
            console.log("not checked");
            console.log(idCat);
            return;}
            
        })*/
       
               
        //chkBox.setAttribute("onclick","disableCheckBox(this)"); // - related to function disableCheckBox
        let span1 = document.createElement('span');
        let catN = categoryRec[count].name;
        chkBox.innerHTML=categoryRec[count].name;
        console.log(catN);
        span1.innerHTML = catN;
        pCat.appendChild(lbl);
        lbl.appendChild(chkBox);
        lbl.appendChild(span1);
        catChk.appendChild(pCat);
    
    }
       
// Submit
document.getElementById("submit").addEventListener('click', async (event) => { event.preventDefault();
    
    await uploadPhoto();
    let RecipeName = document.getElementById('name-text');
    console.log(ingrArr);
    console.log(insArr);
    console.log(categories);
    console.log(imagesArr);
    checked();
    const res = await fetch('/recipe/', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({name: RecipeName.value, ingredients: ingrArr, instructions: insArr, categories: categories, images: imagesArr})
    });
    RecipeName.value = "";
    categories = [];
    imagesArr = [];
    uncheck();

});
// this function clears the checkboxes on Submit
function uncheck() {
    let box = document.querySelectorAll('.checkbox');
    console.log(box);
    for (let i=0; i< box.length; i++ ) {
        if (box[i].checked = true) { 
            box[i].checked = false;}
             else {return;}
    }
}

}