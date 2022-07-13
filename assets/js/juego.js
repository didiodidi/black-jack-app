//Función anonima auto invocada para usar el modo estricto
(() => {
    'use strict'
    
    let deck         =[];
    const tipos      =['C','D','H','S'],
          especiales =['A','J','Q','K'];

    let puntosJugadores = []
    //Referencias del html
    
    const btnDetener       = document.querySelector('#btn-detener'),
          btnPedir         = document.querySelector('#btn-pedir'),
          btnNuevo         = document.querySelector('#btn-nuevo');
          
    const divCartasJugadores = document.querySelector('.divCartas'),
          puntosHtml         = document.querySelectorAll('small');

    //Esta Func inicializa el juego
    const inicializarJuego = (numJugadores = 2) =>{
        deck = crearDeck();
        for(let i = 0; i = numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHtml.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled   =false;
        btnDetener.disabled =false;

    }
 
    //Esta función crea un nuevo deck
    const crearDeck = () =>{

        deck =[];
        for( let i = 2;i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo)
            }
        }
        for(let tipo of tipos){
            for(let esp of especiales)
            deck.push(esp + tipo)
        }    
        return _.shuffle(deck);
    }
    

    //Esta funcion me permite tomar una carta

    const pedirCarta = () => {
    //Creo condición por si ya no hay cartas en el deck
        if (deck.length === 0){
        throw 'No hay mas cartas en el mazo';
        }
    //Busco una carta del deck-->
        return deck.pop();
    }
    // Esta función sirve para obtener el valor de la carta
    const valorCarta = (carta)=> {
    const valor = carta.substring(0, carta.length-1);//Con esto borro la ultima letra de 10D
        return ( isNaN(valor) ) ? 
                (valor === 'A') ? 11:10
                :valor * 1;
    }

    //Turno 0 primer jugadory el ultimo será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores [turno]     = puntosJugadores(turno) + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src   =`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () =>{
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if(puntosComputadora === puntosMinimos){
                alert('nadie gana :(');
            }else if( puntosMinimos > 21 ){
                alert('computadora gana')
            }else if( puntosComputadora >21 ){
                alert('jugadorGana');
            }else{
                alert('computadora gana')
            }
        }, 100 );

    }

    //turno computadora

    const turnoComputadora = ( puntosMinimos ) =>{
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }



    //Eventos
    btnPedir.addEventListener('click', ()=> {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta( carta, 0 )

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
        
        turnoComputadora(puntosJugadores[0]);
    })

    return{
        nuevoJuego: inicializarJuego
    };

})()



