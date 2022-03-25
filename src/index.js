document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('section')
    const score = document.querySelector('.score')
    const container = document.querySelector('.container')
    const options = document.getElementsByClassName('option')

    let pairs = []
    let random_indexes = []
    let indexes = []
    let s = 0
    Array.from(options).forEach(element => {
        s+=2
        element.square = s
        element.addEventListener('click', function(){
            board.style.display = 'flex'
            container.style.display = 'none'
            const size = element.square
            createBoard(size)
            createPairs(size)
            game(size)
        })
    });

    function createBoard(size){
        let iter = 0
        // crearting arrays based on size
        board.style.height = size*100 + 'px'
        board.style.width = size*100 + 'px'
        for(let i=0; i<size*size; i++) {
            if(i%2==0){
                iter++
            }
            pairs[i] = 'pair' + iter
            random_indexes[i]=i
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

    function createPairs(size) {
        // passing created classes to random divs on board 
        let color = ''
        let r = size*size
        for(let i=0; i<size*size; i++) {
            if(i%2==0){
                color = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')'
            }
            t = Math.floor(Math.random()*r)
            r--
            indexes[random_indexes[t]].className = pairs[i]

            //wylosowane kolory
            indexes[random_indexes[t]].children[0].children[1].style.backgroundColor = color

            for(let j=0; j<random_indexes.length; j++){ 
                if ( random_indexes[j] == random_indexes[t]) { 
                    random_indexes.splice(j, 1); 
                }
            }
        }
    }

    function wrongChoice(index) {
        indexes[index].children[0].style.transform = 'rotateY(0deg)'
    }

    function game(size) {
        let kliks = 0
        let choice1 = NaN
        let choice2 = NaN
        let prev_choice = NaN
        let points = 0
        for(let i=0; i<size*size; i++) {
            indexes[i].children[0].addEventListener('click', function(){
                indexes[i].children[0].style.transform = 'rotateY(-180deg)'
                kliks++
            if (kliks%2 == 1) {
                choice1 = indexes[i].className
                prev_choice = i
            } else {
                if(i != prev_choice) {
                    choice2 = indexes[i].className
                    if(choice1!=choice2) {
                        setTimeout(wrongChoice, 750, i)
                        setTimeout(wrongChoice, 750, prev_choice)
                    } else {
                        points++
                    }
                }
            if(points==size*size/2) {
                // restatr event for score button
                score.addEventListener('click', function() {
                window.location.reload(true)
                })
                score.style.display = 'flex'
            }
            }
            })
        }
    }

})