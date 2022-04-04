document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('section')
    const score = document.querySelector('.score')
    const container = document.querySelector('.container')
    const options = document.getElementsByClassName('option')


    //creating different boards for each size chosen by a player
    const pairs = []
    const randomIndexes = []
    const indexes = []
    let lengthOfSide = 0
    let size = 0
    Array.from(options).forEach(element => {
        lengthOfSide+=2
        element.square = lengthOfSide
        element.addEventListener('click', function(){
            board.style.display = 'flex'
            container.style.display = 'none'
            size = element.square
            createBoard(size)
            createPairs(size)
            game(size)
        })
    });

    // crearting board and specific number of pairs based on size and adding HTML elements that allow cards to rotate
    function createBoard(size){
        let iterations = 0
        board.style.height = size*100 + 'px'
        board.style.width = size*100 + 'px'
        for(let i=0; i<size*size; i++) {
            if(i%2==0){
                iterations++
            }
            pairs[i] = 'pair' + iterations
            randomIndexes[i]=i
            indexes[i] = document.createElement('div')
            board.appendChild(indexes[i])
            indexes[i].appendChild(document.createElement('div'))
            indexes[i].children[0].classList.add('flip')
            indexes[i].children[0].appendChild(document.createElement('div'))
            indexes[i].children[0].appendChild(document.createElement('div'))
            indexes[i].children[0].children[0].classList.add('front')
            indexes[i].children[0].children[1].classList.add('back')
            indexes[i].children[0].style.top = Math.floor(i/size)*100 +'px'
            indexes[i].children[0].style.left = (i%size)*100 + 'px'
        }
    }

    // array of randomIndexes contains all posible indexes of board, when specific element of randomIndexes is randomly selected it gets erased from array, when randomIndexes is finnaly empty, all cards have their spot

    function createPairs(size) {
        // passing created classes to random divs on board 
        let color = ''
        let spotsLeft = size*size
        for(let i=0; i<size*size; i++) {
            //each pair of cards gets the same random color
            if(i%2==0){
                color = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')'
            }
            //getting random index
            randomIndex = Math.floor(Math.random()*spotsLeft)
            spotsLeft--
            //every two elements get the same class which is used to comparison
            indexes[randomIndexes[randomIndex]].className = pairs[i]
            //passing colors
            indexes[randomIndexes[randomIndex]].children[0].children[1].style.backgroundColor = color
            //deleting drawn index from randomIndexes
            for(let j=0; j<randomIndexes.length; j++){ 
                if ( randomIndexes[j] == randomIndexes[randomIndex]) { 
                    randomIndexes.splice(j, 1); 
                }
            }
        }
    }

    //rotating cards if they don't match
    function wrongChoice(element) {
        element.style.transform = 'rotateY(0deg)'
        element.addEventListener('click', choosing)
    }

    //don't allow to click on card if its color is visible
    function disableClick(element) {
        element.removeEventListener('click', choosing)
    }

    //adding each card on board event listener
    function game(size) {
        for(let i=0; i<size*size; i++) {
            indexes[i].children[0].addEventListener('click', choosing)
        }
    }

    //comparing cards selected by player
    let kliks = 0
    let choice1 = NaN
    let choice2 = NaN
    let prevChoice = NaN
    let points = 0
    function choosing(event){
        event.target.parentElement.style.transform = 'rotateY(-180deg)'
        disableClick(event.target.parentElement)
        kliks++
        //first card selected
        if (kliks%2 == 1) {
            //check which pair this card belongs to
            choice1 = event.target.parentElement.parentElement.className
            //remember this choice for seceond choice to compair 
            prevChoice = event.target.parentElement.parentElement
        //second card selected
        } else {
            //check if player selected 2 different cards
            if(event.target.parentElement.parentElement != prevChoice) {
                //check which pair this card belongs to
                choice2 = event.target.parentElement.parentElement.className
                //if cards belong to same different classes rotate them
                if(choice1!=choice2) {
                    setTimeout(wrongChoice, 750, event.target.parentElement)
                    setTimeout(wrongChoice, 750, prevChoice.children[0])
                //if calds belong to same class remove event listener and add point
                } else {
                    points++
                    event.target.parentElement.removeEventListener('click', choosing)
                    prevChoice.children[0].removeEventListener('click', choosing)
                }
            //if player selected same card twice rotate it
            } else {
                wrongChoice(event.target.parentElement)
            }   
        }
        //finish game if number of points equals number of classes
        if(points==size*size/2) {
            score.addEventListener('click', function() {
            window.location.reload(true)
            })
            score.style.display = 'flex'
        }
    }
})