$(document).ready(function () {
    $(".loadingScreen").fadeOut(2000, function () {
        $(document.body).css("overflowY", "unset")
    })
})

$(".mynav-menuIcon").click(function(){

    if($(".mynav").css("left")=='0px'){
        $('.mynav').animate({ left: "240px" }, 500)
        $(".nav-menu").attr("class",'nav-menu my-open-menu')
        $(".mynav-menuIcon i").attr("class","fa fa-align-justify fa-times fa-2x")
    }
    else{
        $('.mynav').animate({ left: "0px" }, 500)
        $(".nav-menu").attr("class",'nav-menu my-close-menu')
        $(".mynav-menuIcon i").attr("class","fa fa-align-justify fa-2x")


    }
})

function displayhome(){
    displayMeals(allMeals)
    $("#search-container").css("display","none")
    $("#contact").css("display","none")
    $('.mynav').animate({ left: "0px" }, 500)
    $(".nav-menu").attr("class",'nav-menu my-close-menu')
    $(".mynav-menuIcon i").attr("class","fa fa-align-justify fa-2x")

}


let allMeals=[]
let myCategory=[]
let myArea=[]
let myIngred=[]
let myReq= new XMLHttpRequest()
myReq.open("GET","https://www.themealdb.com/api/json/v1/1/search.php?s=")
myReq.send()
myReq.addEventListener("loadend",function(){
    if(myReq.readyState ==4 && myReq.status ==200){

        allMeals = JSON.parse(myReq.response).meals
        displayMeals(allMeals)

    }
})
function displayMeals(mealObj){
    
    
    let e=''
    for (let i = 0; i <mealObj.length; i++) {
        e+=`       
         <div class="col-md-6 col-lg-3 my-3 myM my-meal overflow-hidden  shadow position-relative"  onclick="getmeal(${mealObj[i].idMeal})" >
        <img class="w-100 overflow-hidden "  src="${mealObj[i].strMealThumb}" alt="">
        <div class="my-layer position-absolute   d-flex align-items-center">
            <h2>${mealObj[i].strMeal} </h2>
        </div>
    

</div>`
    }
    
   $("#rowData").html(e)


}
function searchbar(){
        let box=''
        $("#rowData").html(box)


            $("#search-container").css("display","block")
          $("#contact").css("display","none")
          $('.mynav').animate({ left: "0px" }, 500)
          $(".nav-menu").attr("class",'nav-menu my-close-menu')
          $(".mynav-menuIcon i").attr("class","fa fa-align-justify fa-2x")


      

}

function showContacts(){
    let box=''
    $("#rowData").html(box)
    $("#contact").css("display","block")
    $("#search-container").css("display","none")
    $('.mynav').animate({ left: "0px" }, 500)
    $(".nav-menu").attr("class",'nav-menu my-close-menu')
    $(".mynav-menuIcon i").attr("class","fa fa-align-justify fa-2x")

}

function searchByName(mealName)
{
    let searchMeal = new XMLHttpRequest()
    searchMeal.open("GET",`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    searchMeal.send()
    searchMeal.addEventListener("loadend",function(){
        if(searchMeal.readyState==4 && searchMeal.status==200){
            let searchRes =JSON.parse(searchMeal.response).meals
            displayMeals(searchRes)
            
        }
    })
}

function searchByLetter(char)
{
    if(char){
       let Lsearch= new XMLHttpRequest()
       Lsearch.open("GET",`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
       Lsearch.send()
       Lsearch.addEventListener("loadend",function(){
        if(Lsearch.readyState ==4 && Lsearch.status==200)
        {
            let LsearchRes = JSON.parse(Lsearch.response).meals
            displayMeals(LsearchRes)
        }
       })
    }
}
  

function getmeal(mealId){
    let myMeal =new XMLHttpRequest()
    myMeal.open("GET",`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    myMeal.send()
    myMeal.addEventListener("loadend",function(){
        if(myMeal.readyState ==4 && myMeal.status ==200){
            let res=JSON.parse(myMeal.response).meals
    
            dispalySelectingMeal(res[0])
    
        }
    })

}

function dispalySelectingMeal(meal){
        let recipes = ""
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                recipes += `<li class="my-3 mx-1 p-1 bg-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            }
        }
    
        let tags = meal.strTags?.split(",")

        let tagsStr = "" 

        // console.log(tags.length);

        
        for (let i = 0; i < tags?.length; i++) { 
            tagsStr += `<li class="my-3 mx-1 p-1 bg-danger rounded">${tags[i]}</li>` 
        } 
    
        let cartoonaOfMeals = `
        <div class="col-md-4 myM text-white">
                        <img class="w-100 rounded" src="${meal.strMealThumb}" alt=""
                            srcset=""><br>
                        <h1>${meal.strMeal}</h1>
                    </div>
                    <div class="col-md-8 myM text-white text-left">
                        <h2>Instructions</h2>
                        <p>${meal.strInstructions}</p>
                        <p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
                        <p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
                        <h3>Recipes :</h3>
                        <ul class="d-flex  flex-wrap" id="recipes">
                        </ul>
    
                        <h3 class="my-2 mx-1 p-1">Tags :</h3>
                        <ul class="d-flex  flex-wrap " id="tags">
                        </ul>
    
                        
                        <a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
                        <a class="btn youtube text-white bg-red" target="_blank" href="${meal.strYoutube}">Youtub</a>
                    </div>`

        $("#rowData").html(cartoonaOfMeals) 
        $("#recipes").html(recipes) 
        $("#tags").html(tagsStr) 

}

function showcategory(){
    
    let category= new XMLHttpRequest()
    category.open("GET","https://www.themealdb.com/api/json/v1/1/categories.php")
    category.send()
    category.addEventListener("loadend",function(){
        if(category.readyState==4 && category.status==200){
            myCategory=JSON.parse(category.response).categories
            displayCategories()
    $("#search-container").css("display","none")
    $('.mynav').animate({ left: "0px" }, 500)
    $(".nav-menu").attr("class",'nav-menu my-close-menu')
    $(".mynav-menuIcon i").attr("class","fa fa-align-justify fa-2x")
    $("#contact").css("display","none")





        }
    })
}
 function filterByCategory(category) {
    let categoryFilter = new XMLHttpRequest()
    categoryFilter.open("GET",`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    categoryFilter.send()
    categoryFilter.addEventListener("loadend",function(){
        if(categoryFilter.readyState==4 && categoryFilter.status==200 )
        {
            let caFilter=JSON.parse(categoryFilter.response).meals
            displayMeals(caFilter)
        }
    })

}
function displayCategories() {
    let e = ""
    for (var i = 0; i < myCategory.length; i++) e += `
    <div class="col-md-6 col-lg-3 my-3 my-meal  shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick="filterByCategory('${myCategory[i].strCategory}')" class="post">
                <img src='${myCategory[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="my-layer position-absolute   d-flex flex-column align-items-center">
                <h2>${myCategory[i].strCategory}</h2>
                <p>${myCategory[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>



              
            </div>
        </div>
    </div>`
    $("#rowData").html(e) 

}



function showArea(){
    
    let area= new XMLHttpRequest()
    area.open("GET",`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    area.send()
    area.addEventListener("loadend",function(){
        if(area.readyState==4 && area.status==200){
            myArea=JSON.parse(area.response).meals
            console.log(myArea);
           displayArea()
    $("#search-container").css("display","none")
    $('.mynav').animate({ left: "0px" }, 500)
    $(".nav-menu").attr("class",'nav-menu my-close-menu')
    $(".mynav-menuIcon i").attr("class","fa fa-align-justify fa-2x")
    $("#contact").css("display","none")



           

        }
    })
}

function filterByArea(area) {
    let areaFilter = new XMLHttpRequest()
    areaFilter.open("GET",`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    areaFilter.send()
    areaFilter.addEventListener("loadend",function(){
        if(areaFilter.readyState==4 && areaFilter.status==200 )
        {
            let aFilter=JSON.parse(areaFilter.response).meals
            console.log(aFilter);
            displayMeals(aFilter.slice(0, 20))
        }
    })

}

function displayArea() {
    let e = ""
    for (var i = 0; i < 20; i++) e += `

    <div class="col-md-6 col-lg-3 my-3 myM  my-meal shadow">
        <div class="movie shadow rounded border text-center p-3 position-relative">
            <div onclick=(filterByArea('${myArea[i].strArea}')) class="post ">
                <i class="fa-solid fa-city fa-3x text-danger"></i>
                <h2 class="text-white">${myArea[i].strArea}</h2>
            </div>
        </div>
    </div>`
    $("#rowData").html(e) 


}
function showIngerd(){
    
    let ingerd= new XMLHttpRequest()
    ingerd.open("GET",`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    ingerd.send()
    ingerd.addEventListener("loadend",function(){
        if(ingerd.readyState==4 && ingerd.status==200){
            myIngred=JSON.parse(ingerd.response).meals
           console.log(myIngred);
           displayIngredients()
    $("#search-container").css("display","none")
    $("#contact").css("display","none")
    $('.mynav').animate({ left: "0px" }, 500)
    $(".nav-menu").attr("class",'nav-menu my-close-menu')
    $(".mynav-menuIcon i").attr("class","fa fa-align-justify fa-2x")



           

        }
    })
}

function filterByIngrediant(meal) {
    let ingerdFilter = new XMLHttpRequest()
    ingerdFilter.open("GET",`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
    ingerdFilter.send()
    ingerdFilter.addEventListener("loadend",function(){
        if(ingerdFilter.readyState==4 && ingerdFilter.status==200 )
        {
            let iFilter=JSON.parse(ingerdFilter.response).meals
            console.log(iFilter);
            displayMeals(iFilter)
        }
    })

}

function displayIngredients() {
    let e = ""
    for (var i = 0; i < 20; i++) e += `
    <div class="col-md-6 col-lg-3 my-3 myM my-meal pointer-event  shadow">
        <div onclick="filterByIngrediant('${myIngred[i].strIngredient}')" class="movie text-center text-success shadow rounded position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${myIngred[i].strIngredient}</h2>
                <p class="text-white">${myIngred[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`
    $("#rowData").html(e) 


}
