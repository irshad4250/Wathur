let marsWeatherUrl = "https://api.maas2.apollorion.com"

function main() {
  axios.get(marsWeatherUrl).then((resp) => {
    let response = resp.data
    setTemperatureHigh(response.max_temp)
    setTemperatureLow(response.min_temp)
    setPressure(response.pressure)
    setSunrise(response.sunrise)
    setSunset(response.sunset)
    setSol(response.sol)
    setAtmosphericOpacity(response.atmo_opacity)
    setEarthEquivalent(response.terrestrial_date)
  })
}

function buttonClick() {
  let button = document.getElementsByClassName("solInputButton")[0]
  let reset = document.getElementsByClassName("resetButton")[0]
  let inputBox = document.getElementsByClassName("solInput")[0]

  function userSelectsSol() {
    let text = inputBox.value

    if (!text) {
      return
    }
    inputBox.value = ""

    axios
      .get(marsWeatherUrl + "/" + text)
      .then((resp) => {
        let response = resp.data
        setTemperatureHigh(response.max_temp)
        setTemperatureLow(response.min_temp)
        setPressure(response.pressure)
        setSunrise(response.sunrise)
        setSunset(response.sunset)
        setSol(response.sol)
        setAtmosphericOpacity(response.atmo_opacity)
        setEarthEquivalent(response.terrestrial_date)
      })
      .catch(() => {
        alert("Sol specified not available")
      })
  }

  button.addEventListener("click", userSelectsSol)
  inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      userSelectsSol()
    }
  })

  reset.addEventListener("click", () => {
    inputBox.value = ""
    main()
  })
}

main()
buttonClick()

//DOM manipulators

function setSunrise(time) {
  let sunrise = document.getElementsByClassName("sunReading")[0]
  sunrise.innerText = `Sunrise: ${time}`
}

function setSunset(time) {
  let sunset = document.getElementsByClassName("sunReading")[1]
  sunset.innerText = `Sunset: ${time}`
}

function setTemperatureHigh(tempReading) {
  let tempBox = document.getElementsByClassName("temperatureBox")[0]
  let temp = tempBox.getElementsByClassName("mainReading")[0]
  temp.innerText = `High: ${tempReading}°C`
}

function setTemperatureLow(tempReading) {
  let tempBox = document.getElementsByClassName("temperatureBox")[0]
  let temp = tempBox.getElementsByClassName("mainReading")[1]
  temp.innerText = `Low: ${tempReading}°C`
}

function setAtmosphericOpacity(val) {
  let atmosphericBox = document.getElementsByClassName("atmosphericBox")[0]
  let box = atmosphericBox.getElementsByClassName("titleSmall")[0]
  box.innerText = `Atmospheric Opacity: ${val}`
}

function setSol(solNo) {
  let atmosphericBox = document.getElementsByClassName("atmosphericBox")[0]
  let box = atmosphericBox.getElementsByClassName("solLabel")[0]
  box.innerText = `Sol: ${solNo}`
}

function setPressure(pressure) {
  let pressureBox = document.getElementsByClassName("pressureBox")[0]
  pressureBox.getElementsByClassName(
    "mainReading"
  )[0].innerText = `${pressure} Pa`
}

function setEarthEquivalent(date) {
  let box = document.getElementsByClassName("earthEqui")[0]
  box.innerText = `Earth: ${date.slice(0, 10)}`
}
