// Variables
// Search Filters
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const outcome = document.querySelector('#resultado');
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

// Generate object with the search
const searchObject = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}
document.addEventListener('DOMContentLoaded', e => {
    showCars(autos);
    fillYearsSelector();
});
// Escuchar los cambios en los selects
marca.addEventListener('change', e => {
    searchObject.marca = e.target.value;
    carFilter();
});
year.addEventListener('change', e => {
    searchObject.year = e.target.value;
    carFilter();
});
minimo.addEventListener('change', e => {
    searchObject.minimo = e.target.value;
    carFilter();
});
maximo.addEventListener('change', e => {
    searchObject.maximo = e.target.value;
    carFilter();
});
puertas.addEventListener('change', e => {
    searchObject.puertas = e.target.value;
    carFilter();
});
transmision.addEventListener('change', e => {
    searchObject.transmision = e.target.value;
    carFilter();
});
color.addEventListener('change', e => {
    searchObject.color = e.target.value;
    carFilter();
});

//Functions
// Show cars in document HTML
function showCars(autos) {
    limpiarHtml();

    autos.forEach(car => {
        const { marca, modelo, year, precio, puertas, color, transmision } = car;
        const HTMLCar = document.createElement('p');
        HTMLCar.textContent = `
                ${marca}
                - ${modelo}
                - ${year}
                - $${precio}
                - ${puertas}
                - ${color}
                - ${transmision}
            `;
        outcome.appendChild(HTMLCar)
    });
}
// Limpiar el HTML
function limpiarHtml(){
    while(outcome.firstChild){
        outcome.removeChild(outcome.firstChild);
    }
}
// Fill years selector
function fillYearsSelector() {
    for (let i = maxYear; i > minYear; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}
// Car filter
function carFilter() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor); //Funcion de alto nivel
    
    if(resultado.length){
        showCars(resultado);
    }else{
        noResultado();
    }
}
function noResultado(){
    limpiarHtml();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    outcome.appendChild(noResultado);
}
function filtrarMarca(auto) {
    if (searchObject.marca) {
        return auto.marca === searchObject.marca;
    }
    return auto;
}
function filtrarYear(auto) {
    if (searchObject.year) {
        return auto.year === parseInt(searchObject.year);
    }
    return auto;
}
function filtrarMinimo(auto){
    if (searchObject.minimo) {
        return auto.precio >= searchObject.minimo;
    }
    return auto;
}
function filtrarMaximo(auto){
    if (searchObject.maximo) {
        return auto.precio <= searchObject.maximo;
    }
    return auto;
}
function filtrarPuertas(auto) {
    if (searchObject.puertas) {
        return auto.puertas === parseInt(searchObject.puertas);
    }
    return auto;
}
function filtrarTransmision(auto) {
    if (searchObject.transmision) {
        return auto.transmision === searchObject.transmision;
    }
    return auto;
}
function filtrarColor(auto) {
    if (searchObject.color) {
        return auto.color === searchObject.color;
    }
    return auto;
}