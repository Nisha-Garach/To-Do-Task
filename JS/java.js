// Defining elements and class variables
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// Getting list from localstorage
let data = localStorage.getItem("DATA");

// Checking if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadlist(LIST); // load the list to the user interface
}else{
    // if data is empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadlist(array) {
    array.forEach(function(item){
        addtask(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
function clearall() {
    localStorage.clear();
    location.reload();
};

// adding task to the list
function addtask(task, id, done, trash){
    // checking for item status    
    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${task}</p>
                    <i class="fa fa-remove de" job="delete" id="${id}"></i>
                  </li>
                  `;
    
    const position = "beforeend";
    // editing HTML
    list.insertAdjacentHTML(position, item);
}

// add an item to the list
document.addEventListener("keyup",function(event){
	// adding task using enter button
    if(event.keyCode == 13){
        const task = input.value;
        
        // if the input isn't empty
        if(task){
            addtask(task, id, false, false);
            
            LIST.push({
                name : task,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage
            localStorage.setItem("DATA", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});

// complete a task
function completetask(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove a task
function removetask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// targeting the items created dynamically
list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completetask(element);
    }else if(elementJob == "delete"){
        removetask(element);
    }
    
    // updating items in localstorage
    localStorage.setItem("DATA", JSON.stringify(LIST));
});

// clear completed tasks
function clearcompleted() {
    // checking for completed item
    LIST.forEach(function(item) {
    	if (item.done) {
    		item.trash = true;//deleting completed item
    	}
    })
    clearall()
    // updating the list in user interface
    localStorage.setItem("DATA", JSON.stringify(LIST));
    loadlist(LIST)
}

// complete all tasks
function completeall() {
    // completeing all items of list
    LIST.forEach(function(item) {
    	item.done = true;
    })
    clearall()
    // updating the list in user interface
    localStorage.setItem("DATA", JSON.stringify(LIST));
    loadlist(LIST)
}