let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}); 
fetchToy()

////////// Global Variables //////////
const toyCollection = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")
const nameInput = document.querySelector("#name-input")
const imageInput = document.querySelector("#image-input")

////////// GET Request for Toys //////////
function fetchToy(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toysData => {
    toysData.forEach(toyData => {
      createToy(toyData)
    });
  })
}


////////// Toy Div/Tile Creation /////////
function createToy(toyData){
  const toyDiv = document.createElement("div")
  toyDiv.classList.add("card")

  const h2 = document.createElement("h2")
  h2.textContent = toyData.name

  const img = document.createElement("img") 
  img.src = toyData.image
  img.classList.add("toy-avatar")

  const p = document.createElement("p")
  p.textContent = `${toyData.likes} Likes`

  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.textContent = "Like <3"
  button.dataset.toyId = toyData.id 

  // button.addEventListener("click",createLike)
  

  toyDiv.append(h2, img, p, button)
  toyCollection.append(toyDiv)
}

////////// Submit Toy Event Listener and initializing fetch //////////
toyForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const name = nameInput.value 
  const image = imageInput.value 
  newToyFetch(name, image)
  toyForm.reset();
})

////////// POST fetch when form is submitted //////////
function newToyFetch(name, image){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
      }) 
  })
  .then(resp => resp.json())
  .then(newToy => createToy(newToy))
}

///////// PATCH like functionality /////////
function createLike(e){
  let toyLikes = e.target.previousElementSibling.textContent
  let updatedLikes = parseInt(toyLikes) + 1
  fetch(`http://localhost:3000/toys/${e.target.dataset.toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      "likes": updatedLikes
      }) 
  })
  .then(resp => resp.json())
  .then(e.target.previousElementSibling.textContent = `${updatedLikes} Likes`)
}


