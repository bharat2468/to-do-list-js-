let textbox = document.getElementById('textbox');
let tasks = document.querySelector('.tasks');
let btn = document.getElementById('add_task_button');
var count  = 0;

var arr = JSON.parse(localStorage.getItem('array'));

function update_local(){
    localStorage.setItem('array', JSON.stringify(arr));
}

window.onload = function() {
    get_local_Storage();
};



function get_local_Storage(){
    if(arr == null) { arr = []; }
    else{
        // clear existing content
        tasks.innerHTML = '';

        arr.forEach(todo => {
            let new_todo = generate_todo(todo.name,todo.id,todo.completed);
            tasks.appendChild(new_todo);
        });

        count = arr.length;
    }
}





// *this will return a div to be displayed for a specific todo
function generate_todo(text,count,completed){

    // *creating main div for a todo
    let new_ele = document.createElement('div');

    // *checked or unchecked 
    new_ele.className = "flex relative my-4";
    if(completed){
        new_ele.innerHTML = `<input type="checkbox" checked class="checkbox" id="task-${count}">`;
    }
    else{
        new_ele.innerHTML = `<input type="checkbox" class="checkbox" id="task-${count}">`;
    }
    
    // *adding remianing HTML code
    let additional_content = `
    <label onclick="toggle(${count})" for="task-${count}" class="group w-[70%]">
        <div class="label-div flex">
            <img src="/images/checked.png" id="checked" class="h-6 mr-2">
            <img src="/images/unchecked.png" id="unchecked" class="h-6 mr-2">
            <p class="font-light">${text}</p>
        </div>
    </label>
    <p class="drag-text absolute opacity-0 -right-12">Drag me!</p>
    <button onclick ="remove_task(${count})" class="absolute right-0 top-0"><i class="fa-solid fa-xmark"></i></button>`;

    new_ele.innerHTML += additional_content;

    // *setting the id of the todo - will be used for deletion
    new_ele.id = count;

    // *returning the todo div
    return new_ele;
}




// *pressing enter will trigger the add button 
textbox.addEventListener("keypress",
    (e) => {
        if(e.key === "Enter"){
            btn.click();
        }
    }
    )



function toggle(id){
    for(let i = 0;i<arr.length;i++){
        if(arr[i].id === id){
            arr[i].completed = arr[i].completed ? false : true;
        }
    }
    update_local();
}




function add_task(){
    // *keeping track of the count of the tasks
    count++;

    // *to get the test from the input box
    let task_text = textbox.value;

    let todo = {
        id : count,
        name : task_text,
        completed : false 
    };

    arr.push(todo);
    update_local();


    // *if not null then new task
    if(task_text != ''){
        let new_ele = generate_todo(task_text,count,false);
        tasks.appendChild(new_ele);
        
        textbox.value = '';
    }    
}





function remove_task(id){
    let task = document.getElementById(id);
    task.parentElement.removeChild(task);

    for(let i = 0;i<arr.length;i++){
        if(arr[i].id === id){
            arr.splice(i,1);
        }
    }
    update_local();

    if(task.innerHTML === ''){
        count = 0;
    }
}
