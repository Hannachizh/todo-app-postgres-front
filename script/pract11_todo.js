var inputData = document.querySelector('#inputTask');
var btnAddTask = document.querySelector('#btn-add');
var ulList = document.querySelector('#list');
var spans = document.getElementsByTagName('span');
var currentDate = new Date().toLocaleDateString();
var btnOpen = document.querySelector('#btn-modal');
var modal = document.querySelector('#modal1');
var btnClose = document.querySelector('.modal-close');
var liCross = document.querySelectorAll('li');
var activeLink = document.querySelector('#active');
var notActiveLink = document.querySelector('#not-active');

//<li>Task1 <span>Delete</span></li>
function createTask(){
    var inputValue = inputData.value;
    inputData.value = '';

    if(/* inputValue === '' || */  !inputValue.trim().length){
        inputData.focus();
    } else{
        var newLi = document.createElement('li');
        newLi.innerText = inputValue + ' ' + currentDate;
      
    
        var newSpan = document.createElement('span');
        newSpan.innerText =  ' Delete'
    
        newLi.append(newSpan);
        ulList.append(newLi);
    }
    newLi.addEventListener('click', function(){
        newLi.classList.toggle('cross')
        active();
        notActive();
    })

    removeTask();
    active();
    notActive();
}


//localStorageList

const saveList = () => {
    var list = document.querySelector('#list');
    var html = list.innerHTML
    localStorage.setItem('list-items', html)
    active();
    notActive();
}

const getList = () =>{
    var list = document.querySelector('#list');
    list.innerHTML = localStorage.getItem('list-items')
    active();
    notActive();
}

getList()

document.querySelector('.save-list').addEventListener('click', saveList)


const deleteStorage = () => {
    var list = document.querySelector('#list');
    localStorage.removeItem('list-items')
    list.innerHTML = localStorage.getItem('list-items')
}

document.querySelector('.delete-list').addEventListener('click', deleteStorage)




//CrossElem
liCross.forEach(function(elem){
    elem.addEventListener('click', function(){
        elem.classList.toggle('cross')
        active();
        notActive();
    })
    
});


//ActiveTask
function active(){
    var allTask = document.querySelectorAll('li')
    var allCross = document.querySelectorAll('li.cross')
    activeLink.innerHTML = allTask.length - allCross.length
    var act = activeLink.innerHTML
    localStorage.setItem('active', act)
    
}
//NotActiveTask
function notActive(){
    var allCross = document.querySelectorAll('li.cross')
    notActiveLink.innerHTML =  allCross.length
    var notAct = activeLink.innerHTML
    localStorage.setItem('notActive', notAct)
    
}


//
btnAddTask.onclick = createTask;


//span
function removeTask(){
    for(let spanItem of spans){
        spanItem.onclick = function(){
            spanItem.parentElement.remove();
            active();
            notActive();
        }
    }
}

removeTask();
active();
notActive();


//developer info
btnOpen.addEventListener('click', function(){
        modal.classList.add('modal_open');
})
btnClose.addEventListener('click', function(){
    modal.classList.remove('modal_open');
})


//server
const getTodos = () =>{
    fetch('https://todo-app2002.herokuapp.com/api/post?id=1').then(
        res => res.json()
    ).then(
        
        data => {
            ulList.innerHTML = '';
            data.forEach((item) =>{
                ulList.innerHTML +=  `
                <li>${item.content}<span>Delete</span></li>
                `          
            })
        }
    )
}


const postTodo = () =>{
    var inputValue = inputData.value;

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'applications/json;charser=utf-8'
        },
        body : JSON.stringify(
            {
                "title": "test",
                "content": inputValue,
                "user_id": 1
            }
        )
    };
    fetch('https://todo-app2002.herokuapp.com/api/post?id=1', options).then(
        res => res.json()
    ).then(
        data => console.log(data)
    )
}

getTodos()

btnAddTask.addEventListener('click', postTodo)
btnAddTask.onclick = createTask;

