//Función anonima auto invocada para usar el modo estricto
(() => {
    'use strict'
    
    let deck         =[];
    const tipos      =['C','D','H','S'];
    const especiales =['A','J','Q','K']



    let puntosJugador     = 0,
        puntosComputadora = 0;
    //Referencias del html
    const contadorJugador  = document.querySelector('#contadorJugador')
    const puntosHtml       = document.querySelectorAll('small')
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasPc      = document.querySelector('#computadora-cartas')
    const btnDetener       = document.querySelector('#btn-detener');
    const btnPedir         = document.querySelector('#btn-pedir');
    const btnNuevo         = document.querySelector('#btn-nuevo');
    //console.log(btnPedir)


    //Esta función crea un nuevo deck
    const crearDeck = () =>{

        for( let i = 2;i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo)
            }
        }
        for(let tipo of tipos){
            for(let esp of especiales)
            deck.push(esp + tipo)
        }


    deck = _.shuffle(deck);
    //console.log(deck)
    return deck
    }
    crearDeck();

    //Esta funcion me permite tomar una carta

    const pedirCarta =() => {
    //Creo condición por si ya no hay cartas en el deck

    if (deck.length === 0){
        throw 'No hay mas cartas en el mazo';
    }
    //Busco una carta del deck-->

    const carta = deck.pop()

        return carta
    }

    const valorCarta = (carta)=> {

        const valor = carta.substring(0, carta.length-1);//Con esto borro la ultima letra de 10D
    
        return ( isNaN(valor) ) ? 
                (valor === 'A') ? 11:10
                :valor * 1;


        // ES LO MISMO QUE ESTO -----> 

        // if( isNaN(valor) ){
        //     //console.log("No es un numero")
        //     puntos = ( valor ==='A') ? 11 : 10;
        // }else {
        //     //console.log("Es un numero")
        //     puntos = valor * 1;
        // }
        // console.log(puntos)
    }
    const valor = valorCarta(pedirCarta());
    // console.log({valor})


    //Eventos

    //Turno Jugador
    btnPedir.addEventListener('click', ()=> {

        const carta = pedirCarta();
        
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHtml[0].innerText = puntosJugador;

        //<img class="carta" src="/assets/cartas/3C.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src   = `/assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append( imgCarta );

        if( puntosJugador > 21 ){
            console.warn("PERDISTE");
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if (puntosJugador === 21){
            
            console.warn('21 , genial!')
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } 


    })

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);


    })

    btnNuevo.addEventListener('click', () => {

        //location.reload()
        console.clear()
        deck = [];
        deck = crearDeck();

        puntosJugador     = 0;
        puntosComputadora = 0;
        
        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;

        divCartasPc.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    })


    //Turno de la pc

    const turnoComputadora = (puntosMinimos)=>{

        do{

            const carta = pedirCarta();
        
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;
        
            //<img class="carta" src="/assets/cartas/3C.png" alt="">
            const imgCarta = document.createElement('img');
            imgCarta.src = `/assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasPc.append( imgCarta );

            if(puntosMinimos > 21){
                break;
            }
        }while(( puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if(puntosJugador === puntosComputadora){
                alert("EMPATE")
            }else if(puntosJugador < puntosComputadora){
                alert("FELICITACIONES, GANASTE!")
            }else if (puntosJugador > puntosComputadora){
                alert("LO SIENTO, PERDISTE : /")
            }else{
                alert("COMPUTADORA GANA : V")
            }
        }, 100);
    }


})()



