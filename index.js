// Endpoints
const sweatshirts = "http://localhost:3000/sweatshirts"

// DOM Elements
const sweatshirtList = document.querySelector('#list')
const sweatshirtInfo = document.querySelector('#info')
const buyBtn = document.querySelector('#buy')
const quantity = document.querySelector('#quantity')
const likeBtn = document.querySelector('#like')
const totalLikes = document.querySelector('#totalLikes')
const comment = document.querySelector('#form')
const commentList = document.querySelector('#commentList')
const h2 = document.querySelector('#name')
const h3 = document.querySelector('#brand')
const img = document.querySelector('#image')
const desc = document.querySelector('#description')

// Static Display on Page Load


// Display Sweatshirt Names in List on DOM
function iterateArray (sweatshirtArray) {
    sweatshirtArray.forEach(sweatshirtObj => renderSweatshirts(sweatshirtObj))}

function renderSweatshirts (sweatshirtObj) {
    const p = document.createElement('p')
    p.innerText = sweatshirtObj.brand
    sweatshirtList.append(p)
    p.addEventListener('click', () => displaySelectedSweatshirt(sweatshirtObj))
}

// Display Selected Sweatshirt
function displaySelectedSweatshirt(sweatshirtObj){
    h2.innerText = sweatshirtObj.name
    h3.innerText = sweatshirtObj.brand
    img.src = sweatshirtObj.image
    img.alt = sweatshirtObj.name
    img.style.width = '300px'
    img.style.height = '300px'
    desc.innerText = sweatshirtObj.description
    sweatshirtInfo.append(h2, h3, img, desc)

    // Buy Button Interactivity
    quantity.innerText = sweatshirtObj.quantity
    buyBtn.addEventListener('click', () => remainingQuantity(sweatshirtObj))

    // Like Button Interactivity
    totalLikes.innerText = sweatshirtObj.likes
    likeBtn.addEventListener('click', () => currentLikes(sweatshirtObj))
}

// Buy & Update Sweatshirt
function remainingQuantity(sweatshirtObj) {
    if (sweatshirtObj.quantity >= 1) {
        sweatshirtObj.quantity -= 1
        quantity.innerText = sweatshirtObj.quantity 
    } else;
    updateSweatshirts(sweatshirtObj)
}

// Like & Update Sweatshirt
function currentLikes (sweatshirtObj) {
    sweatshirtObj.likes += 1
    totalLikes.innerText = sweatshirtObj.likes
    updateSweatshirts(sweatshirtObj)
}

// Site Comment Form >>> Add 'comments' array to db.json file. // Add Delete function.
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

function updateSweatshirts (sweatshirtObj) {
    fetch(`http://localhost:3000/sweatshirts/${sweatshirtObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(sweatshirtObj)
    })
    .then(response => response.json())
    .then(sweatshirt => console.log(sweatshirt))
}

// On Page Load Event
document.addEventListener('DOMContentLoaded', fetchSweatshirts)