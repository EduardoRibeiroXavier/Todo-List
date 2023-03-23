const LocalStorageKey = "todo-list";

function ValidadeIfNewTask(){
  let values = JSON.parse(localStorage.getItem(LocalStorageKey) || "[]")
  let inputValue = document.getElementById("input-text").value
  let exists = values.find(x => x.name == inputValue)
  return !exists ? false : true
}


function NewTask() {
  let input = document.getElementById("input-text");
  input.style.border = ''
  // Validação do input
  if (!input.value) {
    input.style.border = '1px solid red'
    alert("Digite algo para ser adicionado");
  }
  else if(ValidadeIfNewTask()) {
    alert('Já existe uma tarefa com essa descrição')
  }
  // Incrementação dos valores no LocalStorage
  else {
    let values = JSON.parse(localStorage.getItem(LocalStorageKey) || "[]");
    values.push({
      name: input.value,
    });
    localStorage.setItem(LocalStorageKey, JSON.stringify(values))
    showValues()
  }
  input.value = ''
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(LocalStorageKey) || "[]");
  let list = document.getElementById("todo-list");
  list.innerHTML = ''
  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `<li>${values[i]["name"]}<button id='btn-ok' onclick = 'RemoveItem("${values[i]["name"]}")'><i class="bi bi-trash"></i></button></li>`;
  }
}
function RemoveItem(data) {
  let values = JSON.parse(localStorage.getItem(LocalStorageKey) || "[]");
  let index = values.findIndex(x => x.name == data)
  values.splice(index,1)
  localStorage.setItem(LocalStorageKey, JSON.stringify(values))
  showValues()
}

showValues()