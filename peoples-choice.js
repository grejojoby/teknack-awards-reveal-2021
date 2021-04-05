// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
  // ——————————————————————————————————————————————————
  // Example
  // ——————————————————————————————————————————————————
  
  const phrases = [
    '3',
    '2',
    '1',


  ]
  const phrases2 = [

      'The Award For',
      'People\'s Choice',
      'Goes To',
      'Wave Surfer',

  ]

//   'that there\'s a difference',

  const el = document.querySelector('.text')
  const fx = new TextScramble(el)
  


  let counter2 = 0
  const next2 = () => {

    fx.setText(phrases2[counter2]).then(() => {

        if(counter2 <phrases2.length){
            setTimeout(next2, 2000);
            
        }
        else{
          document.getElementById("logo").style.visibility = 'visible';
          document.getElementById('logo').style.animation="pulse 1s";
          document.getElementById("dev").style.visibility = 'visible';
          document.getElementById('dev').style.animation="ease-in 2s";
        }
 
    })

    counter2  += 1 
  }


  let counter = 0
  const next = () => {
      console.log("ASDf");
    fx.setText(phrases[counter]).then(() => {
        if(counter <phrases.length){

            setTimeout(next, 1000)
        }else{
            setTimeout(next2, 1000)

        }
    })

    counter = (counter + 1) 
  }
  


  document.getElementById("logo").style.visibility = 'hidden';
  document.getElementById("dev").style.visibility = 'hidden';
  
  next()