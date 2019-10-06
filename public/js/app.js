console.log('this is js ')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1=document.querySelector('#message-1')
const msg2=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    msg1.textContent='Loading..'
    fetch("http://localhost:3000/weather?address="+search.value).then((response)=>{

        
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent=data.error
                msg2.textContent=''
            }
            else{
                msg1.textContent=data.location
                msg2.textContent=data.forecast          
            }
            
        })
    })

})