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
fetchToys()

const toyCollection = document.querySelector("div#toy-collection")
const toyForm = document.querySelector("form.add-toy-form")

////////// Fetch all toys //////////
function fetchToys(){
	fetch("http://localhost:3000/toys")
	.then(resp => resp.json())
	.then (toysData => {
			toysData.forEach(toyData => createToy(toyData))
	})
}

////////// Create a card for each toy ///////////
function createToy(toyData){
	const cardDiv = document.createElement("div")
	cardDiv.classList.add("card")

	const h2 = document.createElement("h2")
	h2.textContent = toyData.name

	const img = document.createElement("img")
	img.src = toyData.image
	img.classList.add("toy-avatar")

	const p = document.createElement("p")
	p.textContent = `${toyData.likes} Likes`
	
	const button = document.createElement("button")
	button.textContent = "Like <3"
	button.classList.add("like-btn")
	button.dataset.toyId = toyData.id

	cardDiv.append(h2, img, p, button)
	toyCollection.append(cardDiv)
}

////////// Event Listener for New Toy //////////
toyForm.addEventListener("submit", fetchNewToy)

function fetchNewToy(e){
	e.preventDefault()
	const name = document.querySelector("#name-input").value
	const image = document.querySelector("#image-input").value
	fetch ("http://localhost:3000/toys", {
		method: "POST",
		headers: {
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
	.then(createToy)
	toyForm.reset()
}

////////// POST request to update Likes //////////
toyCollection.addEventListener("click", likeToy)

function likeToy(e){
	if(e.target.tagName === "BUTTON"){
		let id = e.target.dataset.toyId
		let likes = e.target.previousElementSibling.textContent
		let updatedLikes = parseInt(likes,10)
		updatedLikes++
		fetch(`http://localhost:3000/toys/${id}`, {
			method: "PATCH",
			headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
			},
			body: JSON.stringify({
					"likes": updatedLikes
			})
		})
		.then(resp => resp.json())
		.then(e.target.previousElementSibling.textContent = `${updatedLikes} Likes`)
	}
}