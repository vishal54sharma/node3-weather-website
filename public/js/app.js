

const weatherform = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg1 = document.querySelector('#one')
const msg2 = document.querySelector('#two')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = searchElement.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            msg1.textContent = "Latitude " +data.latitude+ " and Longitude " +data.longitude
            msg2.textContent = "Temperature "+ data.temperature
        }
    })
})
})



