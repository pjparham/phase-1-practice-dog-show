document.addEventListener('DOMContentLoaded', () => {
    getDogData()
    // editDogData()
})

function getDogData(){
    fetch('http://localhost:3000/dogs')
    .then((response) => response.json())
    .then((dogData) => dogData.forEach((dog) => appendTable(dog)))
}
//global variables 
let nameEdit = document.getElementById("dog-form").elements["name"]
let breedEdit = document.getElementById("dog-form").elements["breed"]
let sexEdit = document.getElementById("dog-form").elements["sex"]
let editForm = document.getElementById("dog-form")
let submitId = document.querySelector('#dog-form input[value="Submit"]')
let tableBody = document.getElementById("table-body")
//

function appendTable(dog){
    let tableRow = document.createElement("tr")
    let nameCell = document.createElement("td")
    let breedCell = document.createElement("td")
    let sexCell = document.createElement("td")
    let editCell = document.createElement("td")
    let button = document.createElement('button')
    tableRow.setAttribute("id", `${dog.id}`)
    nameCell.innerText = `${dog.name}`
    breedCell.innerText = `${dog.breed}`
    sexCell.innerText = `${dog.sex}`
    button.innerText = 'Edit Dog'
    editCell.appendChild(button)
    tableBody.appendChild(tableRow)
    tableRow.append(nameCell, breedCell, sexCell, editCell)
    button.addEventListener("click", () => {
            nameEdit.value = `${dog.name}`
            breedEdit.value = `${dog.breed}`
            sexEdit.value = `${dog.sex} `
            submitId.setAttribute("id", `${dog.id}`) //this is so we can apply the dog idea to our new dog object
    })
}


//create new dog object and pull in id to update JSON data in the right spot
editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let dogObj = {
        id: `${e.target[3].id}`,
        name: `${nameEdit.value}`,
        breed: `${breedEdit.value}`,
        sex: `${sexEdit.value}`

    }
    submitEdit(dogObj)
})

function submitEdit(dog){
    console.log(dog.id)
    fetch(`http://localhost:3000/dogs/${dog.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify(dog)
    })
    .then(res => res.json())
    while (tableBody.lastElementChild){
        tableBody.removeChild(tableBody.firstChild)
    }
    getDogData()
}