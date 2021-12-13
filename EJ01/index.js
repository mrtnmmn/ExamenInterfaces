import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch';

const app = express()

app.use(cors())

// Endpoint 1
app.get('/civilizaciones', async (req,res) => {
    let response = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations') 
    let data = await response.json()

    let finalData = {"civilizations": []}

    for (let i = 0; i < (data['civilizations']).length; i++) {
        if (data['civilizations'][i]['expansion'] === 'Age of Kings') {
            finalData['civilizations'].push({
                "id": data['civilizations'][i]['id'],
                "name": data['civilizations'][i]['name'],
                "army_type": data['civilizations'][i]['army_type']
            })
        }
    }    

    res.json(finalData)
})

//Endpoint 2 !! coregir 2
app.get('/unidades', async (req,res) => {

    let response = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/units') 
    let data = await response.json()

    let finalData = {"units": []}

    console.log(data['units'][0])

    let nombre = (req.query).nombre
    let ataque = (req.query).ataque

    if (ataque != undefined) {
        ataque = ataque.charAt(0)
    }
    
    let reNom = new RegExp(nombre)

    console.log(reNom.test(data['units'][0]['name']))
    console.log(ataque)
    console.log((data['units'][0]['attack']).toString())

    if (nombre != undefined && ataque != undefined) {
        for (let i = 0; i < (data['units']).length; i++) {
            if (reNom.test(data['units'][i]['name']) && (data['units'][i]['attack']).toString() === ataque){
                finalData['units'].push({
                    "id": data['units'][i]['id'],
                    "name": data['units'][i]['name'],
                    "description": data['units'][i]['description'],
                    "expansion": data['units'][i]['expansion'],
                    "cost": data['units'][i]['cost'],
                    "build_time": data['units'][i]['buld_time'],
                    "attack": data['units'][i]['attack'],
                    "armor": data['units'][i]['armor'],
                })
            }
        }
    } else if (nombre != undefined && ataque === undefined) {
        for (let i = 0; i < (data['units']).length; i++) {
            if (reNom.test(data['units'][i]['name'])){
                finalData['units'].push({
                    "id": data['units'][i]['id'],
                    "name": data['units'][i]['name'],
                    "description": data['units'][i]['description'],
                    "expansion": data['units'][i]['expansion'],
                    "cost": data['units'][i]['cost'],
                    "build_time": data['units'][i]['buld_time'],
                    "attack": data['units'][i]['attack'],
                    "armor": data['units'][i]['armor'],
                })
            }
        }
    } else if (nombre === undefined && ataque != undefined) {
        for (let i = 0; i < (data['units']).length; i++) {
            if (data['units'][i]['attack'] != undefined) {
                if ((data['units'][i]['attack']).toString() === ataque){
                    finalData['units'].push({
                        "id": data['units'][i]['id'],
                        "name": data['units'][i]['name'],
                        "description": data['units'][i]['description'],
                        "expansion": data['units'][i]['expansion'],
                        "cost": data['units'][i]['cost'],
                        "build_time": data['units'][i]['buld_time'],
                        "attack": data['units'][i]['attack'],
                        "armor": data['units'][i]['armor'],
                    })
                }
            }
        }
    }

    res.json(finalData)
})


//Endpoint 3
app.get('/existe/:civ', async (req,res) => {

    let response = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations') 
    let data = await response.json()

    console.log()

    let final = false 

    for (let i = 0; i < (data['civilizations']).length; i++) {

        if ((data['civilizations'][i]['name']).toLocaleLowerCase().trim() === (req.params.civ).toLocaleLowerCase().trim()) {
            final = true 
        }
    }

    res.json({"result": final})
})



app.listen(6500, () => {
    console.log('Servidor encendido')
})