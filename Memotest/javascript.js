document.addEventListener('DOMContentLoaded', function () {

  //form
  const form = document.getElementById('personalData')
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault()

      let name = document.getElementById('name').value.trim()
      let surname = document.getElementById('surname').value.trim()
      let email = document.getElementById('email').value.trim()

      if(name && email && surname) {
        window.location.href = 'game.html'
      } else {
        alert('Datos Erróneos')
      }
    });
  }

 //game
  let container = document.getElementById('cards')
  let cards = Array.from(container.children)

  cards.sort(() => Math.random() - 0.5)

  cards.forEach(card => container.appendChild(card))

  let firstCard = null
  let secondCard = null
  let lock = false

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {

      if (lock) return
      if (card === firstCard) return

      card.classList.add('flipped')

      if (!firstCard) {
        firstCard = card
        return
      }

      secondCard = card
      lock = true

      if (firstCard.dataset.name === secondCard.dataset.name) {
        firstCard = null
        secondCard = null
        lock = false

        let numberFlipped = document.querySelectorAll('.card.flipped').length
        let numberCards = document.querySelectorAll('.card').length

        if(numberCards === numberFlipped){
          setTimeout(()=>{
            document.querySelector('.overlay').style.display = 'flex'
          }, 1000)
          setTimeout(() =>{
            window.location.href = 'main.html'
          }, 6000)
          
          
        }

      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped')
          secondCard.classList.remove('flipped')

         firstCard = null
         secondCard = null
          lock = false
        }, 1000)
      } 

    })
  })



})
