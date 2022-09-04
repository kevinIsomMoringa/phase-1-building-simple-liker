// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

let likeButtons = document.querySelectorAll('.like-glyph')
likeButtons.forEach(e => {
  e.addEventListener('click', executeOnClick);
});

function executeOnClick() {
  let modal = document.querySelector('#modal')
  let modalMessage = document.querySelector('#modal-message')
  let heart = this.parentNode.children[0];

  mimicServerCall().then(() => {
    heart.innerText = (heart.innerText===EMPTY_HEART)?FULL_HEART:EMPTY_HEART;
    changeClassName(heart, 'activated-heart')
  })
  .catch(err => {
    console.error(err)
    modalMessage.innerText = err
    changeClassName(modal, 'hidden')
    setTimeout(() => {changeClassName(modal, 'hidden')}, 3000);
  })
  
}

function changeClassName(node,toggleClassName) {
  node.className = (node.className.includes(toggleClassName))?(node.className.replace(`${toggleClassName}`,``)):`${node.className} ${toggleClassName}`;
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

async function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return await new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
