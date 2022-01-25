// Endpoints
const sweatshirts = "http://localhost:3000/Sweatshirts"

// DOM Elements
const sweatshirtList = document.querySelector('#list')
const sweatshirtInfo = document.querySelecotr('#info')

// Fetch
function fetchSweatshirts () {
    fetch(sweatshirts)
    .then(response => response.json())
    .then(sweatshirtArray => iterateArray(sweatshirtArray))
}

// Display Sweatshirt Names on DOM
function iterateArray (sweatshirtArray) {
    sweatshirtArray.forEach(sweatshirtObj => {
        const p = document.createElement('p')
        p.innerText = sweatshirtObj.name
        // Add Event Listener for Click
        p.addEventListener('click', function(e) {
            //Name
            const h2 = document.createElement('h2')
            h2.innerText = sweatshirtObj.name
            sweatshirtInfo.append(h2)
            //Brand
            const h3 = document.createElement('h3')
            h3.innerText = sweatshirtObj.brand
            sweatshirtInfo.append(h3)
            //Image
            const img = document.createElement('img')
            img.src = sweatshirtObj.image
            img.alt = sweatshirtObj.name
            sweatshirtInfo.append(img)
            //Description
            const desc = document.createElement('p')
            desc.innerText = sweatshirtObj.description
            sweatshirtInfo.append(desc)
        },
        sweatshirtList.append(p)
    })
}


// On Page Load Event
document.addEventListener('DOMContentLoaded', fetchSweatshirts)