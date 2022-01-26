// Endpoints
const sweatshirts = "http://localhost:3000/sweatshirts"

// DOM Elements
const sweatshirtList = document.querySelector('#list')
const sweatshirtInfo = document.querySelector('#info')
const quantityBtn = document.querySelector('#buy')
const quantity = document.querySelector('#quantity')
const likeBtn = document.querySelector('#like')
const totalLikes = document.querySelector('#totalLikes')
const comment = document.querySelector('#form')
const commentList = document.querySelector('#commentList')

// Static Display on Page Load


// Display Sweatshirt Names in List on DOM
function iterateArray (sweatshirtArray) {
    sweatshirtArray.forEach(sweatshirtObj => renderSweatshirts(sweatshirtObj))}

function renderSweatshirts (sweatshirtObj) {
    const p = document.createElement('p')
    p.innerText = sweatshirtObj.name
    sweatshirtList.append(p)
    p.addEventListener('click', () => {
        //Name
        const h2 = document.querySelector('#name')
        h2.innerText = sweatshirtObj.name
        sweatshirtInfo.append(h2)
        //Brand
        const h3 = document.querySelector('#brand')
        h3.innerText = sweatshirtObj.brand
        sweatshirtInfo.append(h3)
        //Image
        const img = document.querySelector('#image')
        img.src = sweatshirtObj.image
        img.alt = sweatshirtObj.name
        sweatshirtInfo.append(img)
        //Description
        const desc = document.querySelector('#description')
        desc.innerText = sweatshirtObj.description
        sweatshirtInfo.append(desc)
        // Buy Now Button Quantity
        quantity.innerText = sweatshirtObj.quantity
        // Like Total
        totalLikes.innerText = sweatshirtObj.likes

        quantityBtn.addEventListener('click', remainingQuantity)

        function remainingQuantity () {
         if (quantity.innerText >= 1) {
            quantity.innerText -= 1
        } else (quantity.innerText = 0)
        updateQuantity(sweatshirtObj)
        }
    })
}


// FEATURE: Buy Now Button
// quantityBtn.addEventListener('click', remainingQuantity)

// function remainingQuantity () {
//   if (quantity.innerText >= 1) {
//       quantity.innerText -= 1
//   } else (quantity.innerText = 0)
//   updateQuantity(sweatshirtObj)
// }

// FEATURE: Like Button
likeBtn.addEventListener('click', buttonLiked)

function buttonLiked(){
  console.log(totalLikes.innerText += 1)
}

// FEATURE: Site Comment Form
comment.addEventListener('submit', commentForm)

function commentForm(e) {
    e.preventDefault()
    const li = document.createElement('li')
    li.innerText = e.target.comment.value
    commentList.append(li)
}

// Fetch Requests
function fetchSweatshirts () {
    fetch(sweatshirts)
    .then(response => response.json())
    .then(sweatshirtArray => iterateArray(sweatshirtArray))
}

function updateQuantity (sweatshirtObj) {
    fetch(`http://localhost:3000/sweatshirts/${sweatshirtObj.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sweatshirtObj)
    })
    .then(response => response.json())
    .then(sweatshirt => console.log(sweatshirt))
}

// On Page Load Event
document.addEventListener('DOMContentLoaded', fetchSweatshirts)