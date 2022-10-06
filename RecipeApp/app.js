const input_value=document.querySelector('.input_meal')
const btn_search=document.querySelector('.btn-search')

btn_search.addEventListener('click',getValue)
function getValue(e){
    e.preventDefault();
    value=input_value.value;
    document.getElementById('title').innerText='Công thức tìm kiếm từ: '+' ' +value;
    fetchDataAPI(value)
}

//async: đồng bộ
async function fetchDataAPI(value){
    app_id = '24270fcf';
    app_key = '9c8b546d8fefe29384d4e2e11755885e';
    baseURI = `https://api.edamam.com/search?q=${value}&app_id=${app_id}&app_key=${app_key}`;
    result = await fetch(baseURI);
    datas = await result.json();
    createHTML(datas.hits);
}

function createHTML(data){
    html='';
    //toFixed: làm tròn số thập phân
    //target="_blank": mở cửa sổ mới
    data.map(result=>{
        html+=`
        <li>
            <img width="100%" src="${result.recipe.image}">
            <p>Tên món ăn : <span>${result.recipe.label}</span></p>
            <p>Calories : <span>${result.recipe.calories.toFixed(2)}</span></p>
            <p>Ăn kiêng : <span>${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</span></p>
            <p>Tốt cho sức khỏe : <span>${result.recipe.healthLabels}</span></p>
            <a href="${result.recipe.url}" 
            target="_blank" class="btn btn-sm btn-primary">View Recipe</a>
        </li>`
    
    })
    document.querySelector('.li_recipe').innerHTML=html;
}
