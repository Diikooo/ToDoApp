const dom={
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks'),
    count: document.getElementById('count')
};


//array of tasks
const tasks = [];

/* Track , Add tasks */

dom.add.onclick = () =>{
    const newTaskText=dom.new.value;
    if(newTaskText && isNotHaveTask(newTaskText, tasks)){
        addTask(newTaskText,tasks);
        dom.new.value = '';
        tasksRender(tasks);
    }
};

/* This function  adds tasks*/

function addTask(text,list) {
    const timestamp =Date.now();
    const task = {
        id:timestamp,
        text,
        isComplete:false
    };
    list.push(task);
}


/*  Check of existing task in array */

function isNotHaveTask(text, list) {
    let isNotHave = true;

    

    list.forEach((task) => {
        if(task.text == text) {
            alert('The task already  exists');
            isNotHave = false;   
        } 
    });

    return isNotHave;
}

/*Function of output list of tasks  */
function tasksRender(list) {
    let htmlList = '';

    list.forEach((task) => {
        const cls = task.isComplete ? 'todo__task todo__task_complete' : 
        'todo__task';

        const checked = task.isComplete ? 'checked' : '';

        const taskHtml = `   
        <div id="${task.id}" class="${cls}">
                    <label  class="todo-checkbox">
                        <input type="checkbox" ${checked}>
                        <div class="todo__checkbox-div" ></div>
                        
                    </label>
                    <div class="todo__task-text">
                        ${task.text}
                    </div>
                    <div class="todo__task-close">-</div>
                </div>
        `;

         htmlList = htmlList + taskHtml ;
    });

    dom.tasks.innerHTML = htmlList ;

    renderTasksCount(list);
}

//tracking click 
dom.tasks.onclick = (event) => {
    const target = event.target;
    const isCheckboxEl = target.classList.contains('todo__checkbox-div');
    const isDeleteEl = target.classList.contains('todo__task-close');
    
    
    if (isCheckboxEl) {
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute('id');
        changeTaskStatus(taskId, tasks);
        tasksRender(tasks);
    } 

    if(isDeleteEl) {
        const task = target.parentElement;
        const taskId = task.getAttribute('id');
        deleteTask(taskId, tasks);
        tasksRender(tasks);
    }
};

//funtion of changing 

function changeTaskStatus(id, list) {
    list.forEach((task) => {
        if(task.id == id) {
            task.isComplete = !task.isComplete;
        }
    });
}

//delete task function 

function deleteTask(id, list) {
    list.forEach((task, idx) => {
        if  (task.id == id) {
             list.splice(idx, 1);
        }
    });
}


//Output total tasks
function renderTasksCount(list) {
    dom.count.innerHTML = list.length;
}

