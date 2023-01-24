
document.getElementById('loginButton').addEventListener('click', (event) => {
    
    event.preventDefault();

    let username = document.getElementById('usernameLogin').value;
    
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
    })
    .then(() => {
        document.cookie = `${username}`;
        location.reload();
    })
    .catch(err => console.log(err));
        
});