const { BrowserWindow, dialog } = require('electron').remote;
const path = require('path');

const button = document.getElementById('verificar');

const automata = {
    estadoInicial: 0,
    estadoFinal: 2,
    transiciones: [
        {
            estado: 0,
            simbolo: 'a',
            al_estado: 0
        },
        {
            estado: 0,
            simbolo: 'b',
            al_estado: 1
        },
        {
            estado: 1,
            simbolo: 'b',
            al_estado: 1
        },
        {
            estado: 1,
            simbolo: 'c',
            al_estado: 2
        },
        {
            estado: 2,
            simbolo: 'c',
            al_estado: 2
        }
    ]
};

button.addEventListener("click", function() {
    let cadena = document.getElementById('txtCadena').value;
    let estadoActual = automata.estadoInicial;
    let error = false;
    let x = false;

    console.log(cadena.length);


        cadena.split('').forEach(simbolo => {
            console.log(simbolo);
            let encuentraTransicion = false;

            automata.transiciones.forEach(transicion => {
                if (transicion.estado == estadoActual && transicion.simbolo == simbolo && encuentraTransicion == false) {
                    estadoActual = transicion.al_estado;
                    encuentraTransicion = true;
                    return;
                }
            });

            if (!encuentraTransicion) {
                    error = true;
                    return;
            }

        });

        if (!error) {
            if(automata.estadoFinal == estadoActual){
                x = true;
                let options = {
                    buttons: ["Aceptar"],
                    message: "Cadena correcta"
                }
                dialog.showMessageBox(options);
                return;
            }else if(cadena.length === 0){
                x = true;
                let options = {
                    buttons: ["Aceptar"],
                    message: "La cadena vacía también es correcta"
                }
                dialog.showMessageBox(options);
            }
            if(x == false){
                dialog.showErrorBox('Error', 'cadena incorrecta');
                return;
            }

        }
        else{
            dialog.showErrorBox('Error', 'Cadena incorrecta');
            return;
        }
});
