import './styles.css'

function getRandom(n,m) {
    return Math.round(Math.random()*(m-n) + n)
}


document.getElementById('elegir').addEventListener("click", async function() {

    let response1 = await fetch('http://localhost:6500/civilizaciones')
    let data1 = await response1.json()

    console.log(data1)

    let num = document.getElementById('randomCivs').value

    let numbers = []
    let repetido 
    let numRandom

    for(let i = 0; i < num; i++) {
        repetido = true 
        while (repetido) {
            numRandom = getRandom(0,data1["civilizations"].length)
            repetido = false
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] === numRandom) {
                    repetido = true
                }
            }
        }

        console.log(numRandom)
        console.log(data1["civilizations"])
        console.log(data1["civilizations"][numRandom])

        document.getElementById("civilizaciones").innerHTML += data1["civilizations"][numRandom]["name"] + " "
    }

    let arr = (document.getElementById('textArea').value).split(',')


    let url

    for (let i = 0; i < arr.length; i ++ ) {

        url = 'http://localhost:6500/existe/' + arr[i]

        let response = await fetch(url)
        let data = await response.json()
        
        if (data['result'] === false ) {
            document.getElementById('incorrectas').innerHTML += arr[i]
        }

    }

    console.log(arr)
})

document.getElementById('limpiar').addEventListener("click", function() {
    document.getElementById('textArea').value = ""
    document.getElementById('randomCivs').value = ""
    document.getElementById('civilizaciones').value = ""
    document.getElementById('incorrectas').value = ""

})


