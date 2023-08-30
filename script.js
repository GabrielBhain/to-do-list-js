const localStorageTasks = 'to-do-list-gn'

function validateExistingTask() {
    let tasks = JSON.parse(localStorage.getItem(localStorageTasks) || '[]')
    let inputValue = document.getElementById('input-new-task').value;
    let exists = tasks.find(x => x.name == inputValue)
    return !exists ? false : true;
}

function newTask() {
    let input = document.getElementById('input-new-task');
    input.style.border = ''

    if (!input.value) {
        input.style.border = '1px solid red'
        alert('Enter something to add to your list.');
    }
    else if (validateExistingTask()) {
        input.style.border = '1px solid red'
        alert('This task has already been added.');
    }
    else {
        //increment to local storage
        let tasks = JSON.parse(localStorage.getItem(localStorageTasks) || '[]')
        tasks.push({
            name: input.value
        })
        console.log(tasks)
        localStorage.setItem(localStorageTasks, JSON.stringify(tasks))
        showTasks()
    }
    input.value = ''
}
function showTasks() {
    let tasks = JSON.parse(localStorage.getItem(localStorageTasks) || '[]')
    let list = document.getElementById('to-do-list');
    list.innerHTML = ''
    for (let i = 0; i < tasks.length; i++) {
        list.innerHTML += `<li>${tasks[i]['name']} <button id='btn-v' onclick='removeTask("${tasks[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`
    }
}

function removeTask(data) {
    let tasks = JSON.parse(localStorage.getItem(localStorageTasks) || '[]')
    let index = tasks.findIndex(x => x.name == data)
    tasks.splice(index, 1)
    localStorage.setItem(localStorageTasks, JSON.stringify(tasks))
    showTasks()
}

showTasks()