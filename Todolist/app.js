const input_value=document.getElementById('input_value');
const btn_add=document.getElementById('btn_add');
const list_todo=document.querySelector('.list-todo')
const filter_todo=document.getElementById('select_todo')

btn_add.addEventListener('click',addtodo);
list_todo.addEventListener('click',deleteTodo);
filter_todo.addEventListener('click',filterTodo);

listTodoLocalStorage();

function addtodo(e){
    //vì bên html sử dụng input có type:submit nên phải dùng preventDefault để ngăn sự kiện mặc định của nó
    // type:submit khi click vào sẽ tải lại trang
    e.preventDefault();
    todo=input_value.value;
    if(todo){
        const newDiv=document.createElement('div');
        newDiv.classList.add('todo');//thêm class 

        //tạo li
        const newTodo=document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');

        //gán li cho div
        newDiv.appendChild(newTodo);

        //tạo button hoàn thành
        const btn_hoanthanh=document.createElement('button');
        btn_hoanthanh.innerText="Hoàn Thành"
        btn_hoanthanh.classList.add('completed_btn');
        newDiv.appendChild(btn_hoanthanh);

        //tạo button xóa
        const btn_xoa=document.createElement('button');
        btn_xoa.innerText="Xóa"
        btn_xoa.classList.add('delete_btn');
        newDiv.appendChild(btn_xoa);

        //gán div cho list_todo
        list_todo.appendChild(newDiv)

        saveLocalStorage(todo);  
        input_value.value="";      
    }

}

function deleteTodo(e){
    const item=e.target;
    
    //delete todo
    if(item.classList[0]==="delete_btn"){
        const todo=item.parentElement;//parentElement: trả về thẻ html đang chứa thẻ hiện tại
        todo.remove();
        removeLocalStorage(todo);
    }

    //completed
    if(item.classList[0]==="completed_btn"){
        const todo=item.parentElement;//parentElement: trả về thẻ html đang chứa thẻ hiện tại
        todo.classList.toggle('completed');
        updateLocalStorageItem(todo);
    }
}

function updateLocalStorageItem(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];

    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }

    //trả về text của element
    const todoIndex=todo.children[0].innerText;//children: lấy ra element đầu tiên
    
    //tìm ra object có tên là todoIndex 
    index=todos.findIndex(obj =>obj.text===todoIndex);
    //update complete tại index 
    todos[index].complete=true;
    localStorage.setItem('todos',JSON.stringify(todos));
}

function removeLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];

    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }

    const todoIndex=todo.children[0].innerText;//children: lấy ra element đầu tiên
    //tìm đến tên todoIndex trả về và xóa đi 1 lần trong todos
    todos.splice(todos.indexOf(todoIndex),1);//splice: cắt đi, indexOf: tìm đến tên tương ứng
    //chạy lại localStorage
    localStorage.setItem('todos',JSON.stringify(todos));
}

function saveLocalStorage(todo){
    let todos;
    
    //localStorage: database của web
    if(localStorage.getItem('todos')===null){
        todos=[];

    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    todos.push({
        text:todo,
        complete:false
    });
    localStorage.setItem('todos',JSON.stringify(todos));//stringify: chuyển object sang Json
}

function listTodoLocalStorage(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];

    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(nhiemvu=>{
        const newDiv=document.createElement('div');
        newDiv.classList.add('todo');//thêm class 
    
        //tạo li
        const newTodo=document.createElement('li');
        newTodo.innerText=nhiemvu.text;
        newTodo.classList.add('todo-item');
    
        //gán li cho div
        newDiv.appendChild(newTodo);
    
        //tạo button hoàn thành
        const btn_hoanthanh=document.createElement('button');
        btn_hoanthanh.innerText="Hoàn Thành"
        btn_hoanthanh.classList.add('completed_btn');
        newDiv.appendChild(btn_hoanthanh);
    
        //tạo button xóa
        const btn_xoa=document.createElement('button');
        btn_xoa.innerText="Xóa"
        btn_xoa.classList.add('delete_btn');
        newDiv.appendChild(btn_xoa);
    
        //gán div cho list_todo
        list_todo.appendChild(newDiv)

        if(nhiemvu.complete==true){
            newDiv.classList.add('completed');
            btn_hoanthanh.innerText="Đã Hoàn Thành"
            btn_hoanthanh.style.color="Green"
            btn_hoanthanh.disabled=true
        }
    })
    
}

//lọc ra các todo 
function filterTodo(e){
    const todo=list_todo.childNodes;
    todo.forEach(nhiemvu => {
        switch (e.target.value) {

            case "tatca":
                nhiemvu.style.display="block"
                break;
            case "hoanthanh":
                if(nhiemvu.classList.contains('completed')){
                    nhiemvu.style.display="block"
                }
                else{
                    nhiemvu.style.display="none"
                }
                break;
            case "chuahoanthanh":
                if(!nhiemvu.classList.contains('completed')){
                    nhiemvu.style.display="block"
                }
                else{
                    nhiemvu.style.display="none"
                }
                break;
        }
    })
}