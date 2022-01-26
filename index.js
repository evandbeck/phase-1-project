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
    p.innerText = sweatshirtObj.name
    sweatshirtList.append(p)
    p.addEventListener('click', () => displaySelectedSweatshirt(sweatshirtObj))
}

function displaySelectedSweatshirt(sweatshirtObj){
        //Name
        h2.innerText = sweatshirtObj.name
        //sweatshirtInfo.append(h2)
        //Brand
        h3.innerText = sweatshirtObj.brand
        //sweatshirtInfo.append(h3)
        //Image
        img.src = sweatshirtObj.image
        img.alt = sweatshirtObj.name
        //sweatshirtInfo.append(img)
        //Description
        desc.innerText = sweatshirtObj.description
        sweatshirtInfo.append(h2, h3, img, desc)

        // Buy Button Interactivity
        quantity.innerText = sweatshirtObj.quantity

        buyBtn.addEventListener('click', () => remainingQuantity(sweatshirtObj))

        
        // Like Button Interactivity
        let sweatshirtLike = sweatshirtObj.likes
        totalLikes.innerText = sweatshirtLike

        likeBtn.addEventListener('click', currentLikes)

        function currentLikes () {
            sweatshirtLike += 1
            totalLikes.innerText = sweatshirtLike
            updateBuyLike({...sweatshirtObj, likes: sweatshirtLike})
        }
}


function remainingQuantity(sweatshirtObj) {
    if (sweatshirtObj.quantity >= 1) {
        sweatshirtObj.quantity -= 1
        quantity.innerText = sweatshirtObj.quantity 
    } else {
        buyBtn.innerText = "Sold Out!";
    } 
    updateBuyLike(sweatshirtObj)
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

function updateBuyLike (sweatshirtObj) {
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