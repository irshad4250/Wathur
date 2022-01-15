let facts = [
  "Mars Had Water In The Ancient Past.",
  "Mars Has Frozen Water Today.",
  "Mars Has Two Moons And One Of Them Is Doomed.",
  "You could jump around three times higher on Mars than you can on Earth.",
  "A year on Mars is 687 Earth days.",
  "A day is 24 hours 37 minutes on Mars.",
  "Like Earth, Mars has seasons, polar ice caps, volcanoes, canyons, and weather.",
  "Mars is home to Olympus Mons, a dormant volcano and the largest volcano and highest mountain in our solar system. It is 16 miles high and 600 km across the base, making it 3x the height of Mount Everest.",
]

async function typingEffect() {
  let factsList = document.getElementsByClassName("factsList")[0]

  for (let i = 0; i < facts.length; i++) {
    const fact = facts[i]
    let list = document.createElement("li")
    const id = getId(1, 10000).toString()
    list.setAttribute("id", id)
    factsList.appendChild(list)

    await typeLine(fact, id)
  }

  function typeLine(fact, id) {
    return new Promise((resolve, reject) => {
      let j = 0
      const list = document.getElementById(id)

      let interval = setInterval(() => {
        const letter = fact[j]
        list.innerHTML += letter
        j++
        if (fact.length === j) {
          clearInterval(interval)
          resolve(true)
        }
      }, 35)
    })
  }
}

function getTop() {
  let val = getId(1, 50).toString()
  val += "%"
  return val
}

function getLeft() {
  let val = getId(1, 100).toString()
  val += "%"
  return val
}

function getRight() {
  let val = getId(1, 100).toString()
  val += "%"
  return val
}

function doRandomComet() {
  let randomNum = getId(1, 3)

  if (randomNum == 1) {
    let left = getLeft()
    let top = getTop()

    let img = document.createElement("img")
    img.src = "/assets/images/moving/comet.png"

    img.classList.add("comet")

    if (getId(1, 3) == 1) {
      img.style.right = left
    } else {
      img.style.top = top
    }

    document.body.appendChild(img)
    setTimeout(() => {
      document.body.removeChild(img)
    }, 1000)
  } else {
    let left = getLeft()
    let top = getTop()

    let img = document.createElement("img")

    if (getId(1, 3) == 1) {
      img.src = "/assets/images/moving/comet (1).png"
    } else {
      img.src = "/assets/images/moving/comet (2).png"
    }

    img.classList.add("cometRight")

    if (getId(1, 3) == 1) {
      img.style.left = left
    } else {
      img.style.top = top
    }

    document.body.appendChild(img)
    setTimeout(() => {
      document.body.removeChild(img)
    }, 1000)
  }
}

async function animations() {
  let rocket = document.getElementsByClassName("rocketAtStart")[0]
  await wait(15000)
  rocket.style.bottom = "110%"
  await wait(2000)
  rocket.style.transform = "rotate(110deg)"
  rocket.style.width = "30px"
  rocket.style.transition = "1000ms linear bottom left"
  rocket.style.bottom = "50%"
  rocket.style.left = "110%"
  await wait(10000)
  rocket.style.width = "60px"
  rocket.style.bottom = "50%"
  rocket.style.left = "57px"
  rocket.style.transform = "rotate(-90deg)"
  await wait(1000)
  rocket.style.transition = "500ms"
  rocket.style.transitionProperty = "transform bottom"
  rocket.style.transform = "rotate(0deg)"
  await wait(500)
  rocket.style.bottom = "100px"
}

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function getId(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

typingEffect()
animations()
setInterval(() => {
  doRandomComet()
}, 3000)
