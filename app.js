
console.log("version89");
//El navegador intenta conectarse al servidor. Es como marcar el número de teléfono.
const ws = new WebSocket("wss://chat-term-servidor.onrender.com");
//supongo que sustituyes localhost3000 por el url del servidor
const rejiondemensajes = document.querySelector('#mensajeria');


let nombre_usuario = "default_name"; 
nombre_usuario = localStorage.getItem('usuarioGuardado');

const arraydecosas = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

//Aquí el cliente escucha mensajes que manda el servidor.
ws.onmessage = (event) => {
    console.log(event.data);
    event.data = event.data.toString();
    console.log(event.data);
    let data_del_server = [event.data[0], event.data[1]];//.split(","); 
    console.log(data_del_server)

    if(data_del_server.length === 1){
        RecivirmensajeSystem(data_del_server);
    }else{
        Recivirmensaje(data_del_server)
    }

        const parrafo = document.getElementById('mensajeria');

        // 2. Comprobamos si el contenido es más alto que el contenedor
        if (parrafo.scrollHeight > parrafo.clientHeight) {
            
            // 3. Limpiamos el contenido
            parrafo.innerHTML = ""; 
            
            if(data_del_server.length === 1){
                RecivirmensajeSystem(data_del_server);
            }else{
                Recivirmensaje(data_del_server)
            }
        }
};
function Recivirmensaje(mensaje){
    rejiondemensajes.innerHTML += `${mensaje[0]} > ${mensaje[1]}<br> `;
}

function RecivirmensajeSystem(mensaje){
    rejiondemensajes.innerHTML += `---------- > ${mensaje}<br>`;

}

let idjugador = ""

for(let i = 0; i < 10; i++){
    idjugador = idjugador + arraydecosas[Math.floor(Math.random() * arraydecosas.length)];
}


//ejecuta al abrir la conexion
ws.onopen = () => {
    ws.send(`cliente conectado id : ${idjugador}`);
    console.log(`Conectado. tu id es ${idjugador}`);

    ///////////////////////////////////
    const boton = document.querySelector('.sendbutton');
    const input = document.querySelector('#userInput');


    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const texto = input.value;
            if(texto.trim() !== ""){
                //ws.send(idjugador + "ALLCLIENTS_LOG" + texto);
                ws.send(JSON.stringify([nombre_usuario, "ALLCLIENTS_LOG" + texto]));
                input.value = "";
            }
        }
    });

    boton.addEventListener('click', ()=>{
        const texto = input.value;
        if(texto.trim() !== ""){
            //ws.send(idjugador + "ALLCLIENTS_LOG" + texto);
            ws.send(JSON.stringify([nombre_usuario, "ALLCLIENTS_LOG" + texto]));
            input.value = "";
        }
    });


};










