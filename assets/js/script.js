let listanamegastos = [];
let listavalorgasto = [];
let editindex = null

function clickBoton(){
   let namegasto  = document.getElementById ('nombreGasto').value;
   let valorgasto = document.getElementById('valorGasto').value;
   
   
   listanamegastos.push(namegasto);
   listavalorgasto.push (valorgasto);
   console.log(listanamegastos);
   console.log(listavalorgasto);
   updatelistagasto();
}



function updatelistagasto() {
   const listaelementos = document.getElementById('listaDeGastos');
   const totalelemento = document.getElementById('totalGastos');
   let htmllista = '';
   let totalgasto = 0;

   listanamegastos.forEach((element, posicion) => {
      const valorGasto = Number(listavalorgasto[posicion]);

      htmllista += `
         <li>
            ${element} - DOP ${valorGasto.toFixed(2)} 
            <button onclick="eliminargasto(${posicion});">Eliminar</button>
            <button onclick="modificargasto(${posicion});">Modificar</button>
         </li>`;
      totalgasto += valorGasto;
   });
   listaelementos.innerHTML = htmllista;
   totalelemento.innerHTML = totalgasto.toFixed(2);
   limpiar();
}

function modificargasto(posicion) {
  
   const nombreGasto = listanamegastos[posicion];
   const valorGasto = listavalorgasto[posicion];

   document.getElementById('nombreGasto').value = nombreGasto;
   document.getElementById('valorGasto').value = valorGasto;

 
   listanamegastos.splice(posicion, 1);
   listavalorgasto.splice(posicion, 1);

  
   updatelistagasto();
}


function limpiar(){
  

   document.getElementById ('nombreGasto').value = '';
   document.getElementById('valorGasto').value = '';
}

function eliminargasto(posicion){
   listanamegastos.splice(posicion,1);
   listavalorgasto.splice(posicion,1);
   updatelistagasto();

}
document.getElementById('generarGrafico').addEventListener('click', () => {
   const categorias = ['Alquiler', 'Comida', 'Transporte'];
   const valores = [500, 300, 150]; 

   fetch('http://127.0.0.1:5000/generar-grafico', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ categorias, valores })
   })
   .then(response => response.blob())
   .then(imageBlob => {
       const url = URL.createObjectURL(imageBlob);
       const graficoImg = document.getElementById('graficoGastos');
       graficoImg.src = url;
       graficoImg.style.display = 'block'; // Mostrar la imagen
   })
   .catch(error => console.error('Error:', error));
});

