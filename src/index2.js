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
  fetchToy()
}); 


const toyCollection = document.querySelector("#toy-collection")
const addToyForm = document.querySelector("#add-toy-form")
const toyFormContainer = document.querySelector(".container")

toyFormContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("#name-input").value
  const imageInput = document.querySelector("#image-input").value
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      "name" : nameInput,
      "image": imageInput, 
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(toy => {
    makeCard(toy)
  })
})


function fetchToy(){
	fetch('http://localhost:3000/toys')
	.then(response => response.json())
	.then(toys => {
		toys.forEach (toy =>
			makeCard(toy))
	})
}


function makeCard(toy) {
  const classCard = document.createElement('div')
  classCard.className = "card"

  const h2 = document.createElement('h2')
  h2.textContent = toy.name 
  
  const img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"
  
  const p = document.createElement('p')
  p.textContent = `${toy.likes} likes`
  
  const button = document.createElement('button')
  button.className = "like-btn"
  button.dataset.toyId = toy.id
  button.innerText = "like <3"
  
  button.addEventListener('click', (e) => {
    console.log(e.target.dataset)
    likes(e)
  })
  classCard.append(h2, img, p, button)
  toyCollection.append(classCard)
}
function likes(e) {
    let toyLikes = e.target.previousElementSibling.innerText
    let updatedLikes = parseInt(toyLikes) + 1
    fetch(`http://localhost:3000/toys/${e.target.dataset.toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "likes": updatedLikes
      })
    })
    .then(response => response.json())
    .then(likedObject => {
      e.target.previousElementSibling.innerText = `${updatedLikes} likes`;
    })
}