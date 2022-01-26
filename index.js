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

// Fetch
function fetchSweatshirts () {
    fetch(sweatshirts)
    .then(response => response.json())
    .then(sweatshirtArray => iterateArray(sweatshirtArray))
}

// DELIVERABLE: Static Display on Page Load


// Display Sweatshirt Names on DOM
function iterateArray (sweatshirtArray) {
    sweatshirtArray.forEach(sweatshirtObj => {
        const p = document.createElement('p')
        p.innerText = sweatshirtObj.name
        // Add Event Listener for Click
        p.addEventListener('click', function(e) {
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
        },
        sweatshirtList.append(p)
        )}
    )}

// Buy Now Button
quantityBtn.addEventListener('click', quantityLeft)

function quantityLeft () {
  if (quantity.innerText >= 1) {
      quantity.innerText -= 1
  } else (quantity.innerText = 0)
}

// Like Button
likeBtn.addEventListener('click', buttonLiked)

function buttonLiked(){
  console.log(totalLikes.innerText += 1)
}

// Site Comment Form
comment.addEventListener('submit', commentForm)

function commentForm(e) {
    e.preventDefault()
    const li = document.createElement('li')
    li.innerText = e.target.comment.value
    commentList.append(li)
}

// On Page Load Event
document.addEventListener('DOMContentLoaded', fetchSweatshirts)