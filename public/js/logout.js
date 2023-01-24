let logoutUsername = document.getElementById('tituloLogout');
if (logoutUsername != null) logoutUsername.textContent = `Hasta luego ${document.cookie}`;

setTimeout(() => {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then(() => {
        document.cookie = "username=; max-age=0";
        location.href = 'http://localhost:8080/';
    })
    .catch(err => console.log(err));
}, 2000);