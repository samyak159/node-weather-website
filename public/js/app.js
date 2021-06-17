// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


// fetch('/weather?address=Delhi').then((response) => {
//     response.json().then((data) => {
//     if(data.error){
//         console.log(data.error)
//     } else{
//     console.log(data.location)
//     console.log(data.forecast)
// }
// })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent ='From JS'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    //console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
    if(data.error){
        //console.log(data.error)
        messageOne.textContent = data.error
    } else{
        messageOne.textContent =data.location
        messageTwo.textContent =data.forecast

    // console.log(data.location)
    // console.log(data.forecast)
}
})
})

})