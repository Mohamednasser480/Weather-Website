console.log('js File');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const  userResponse = document.querySelector('#UserResponse');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;    
    userResponse.textContent = '...loading'
    document.querySelector('#location').textContent = '';

fetch('/Weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.Error) userResponse.textContent = data.Error
        else 
            userResponse.textContent = data.description;
            document.querySelector('#location').textContent = data.location;
    });
});
})