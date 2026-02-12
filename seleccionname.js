//El navegador intenta conectarse al servidor. Es como marcar el número de teléfono.
const ws = new WebSocket("wss://chat-term-servidor.onrender.com");
//supongo que sustituyes localhost3000 por el url del servidor

//Aquí el cliente escucha mensajes que manda el servidor.
ws.onmessage = (event) => {
    
};

console.log("Conectando con el servidor, si no va perate 20 segundos o algo yo que cojones se");
//ejecuta al abrir la conexion
ws.onopen = () => {
  const inputname = document.querySelector(`#userInputnombre`);
  const botonname = document.querySelector(`.sendbuttonnombre`);

    botonname.addEventListener('click', ()=>{
        const texto = inputname.value;
        if(texto.trim() !== ""){
            //ws.send(idjugador + "ALLCLIENTS_LOG" + texto);
            localStorage.setItem('usuarioGuardado', inputname.value);
            window.location.href = "chat.html";
        }
    });
};




