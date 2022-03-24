let addToy = false;

document.addEventListener("DOMContentLoaded", () => { 

  // fetch with GET request (gets all of our base data from server)
  const getToys = () => {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toyInfo => {
    console.log(toyInfo)
    toyInfo.forEach(addToyInfo)// pass data to function that adds a new card for each toy to the dom
  }) 
  } 
  getToys()

  // 1. selecting the div that holds the cards
  // 2. selecting the form
  const toyContainer = document.querySelector("div#toy-collection")
  const toyForm = document.querySelector("form.add-toy-form")

  //toyForm functionality including POST
  toyForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const name = document.getElementsByTagName("input")[0].value
    console.log(name)
    const image = document.getElementsByTagName("input")[1].value
    console.log(image)

    // set up of new object prototype
    const newCardObj = {
      name: name,
      image: image,
      likes: 0
    }

    //POST request to send new character to the server
    fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(newCardObj)
    }).then(res => {
      return res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log("ERROR"))
    
    addToyInfo(newCardObj)
    toyForm.reset();
  })

  // Like button functionality


  // function to handle all new card creation
function addToyInfo(toy) {
  const toyCard = document.createElement("div") // create a card
  toyCard.className = "card"; // set class name

  //Toy properties
  const toyName = document.createElement("h2")
  toyName.textContent = toy.name
  const toyImg = document.createElement("img"); // create img
  toyImg.src = toy.image // set src
  toyImg.className = "toy-avatar" // set class

  //Likes num
  const likesNum = document.createElement("p"); // add likes count
  likesNum.textContent = toy.likes

  //like button
  const likeButton = document.createElement("button"); 
  likeButton.textContent = "Like ❤️"
  likeButton.className = "like-btn"
  likeButton.id = toy.id
  likeButton.addEventListener("click", function () {
    let newNumberOfLikes = ++toy.likes;
    likesNum.textContent = toy.likes;

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
  });

  toyCard.append(toyName, toyImg, likesNum, likeButton) // add elements to card
  toyContainer.appendChild(toyCard) // add card to body
}

// precoded new toy hide and show
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