// Simulador de Rserva de Hotel Korax


//Definicion de elementos y arrys
let costoPorDia = 2000

let tablaHab = document.getElementById("tablaHab")

let formUsuario = document.getElementById("divForm")

let formDatos = document.getElementById('formDatos')

let btnFiltrar = document.getElementById('btnFiltrar')

let datosJson = document.getElementById('datosJson')

let paquetesCliente = document.getElementById('paquetesCliente')

let datosClienteFinal = document.getElementById('datosClienteFinal')

let btnDis = document.getElementById('btnDis')

let terminarJs = document.getElementById('terminarJs')

let habitacionE = []

let datosAcompaniante = []

let ticket = []

// Un class para guardar un array con las habitaciones
class Habitacion{

    constructor(id, dormitorio, banio, cocina, living, plus){
        this.id = id 
        this.dormitorio = dormitorio
        this.banio = banio
        this.cocina = cocina
        this.living = living
        this.plus = plus
    }
}


const hab1Op1Ob = new Habitacion(1, "1", "1", "Si", "Si", "Pileta")

const hab1Op2Ob = new Habitacion(2, "1", "1", "Si", "Si", "Balcón")

const hab2Op1Ob = new Habitacion(3, "2", "1", "Si", "Si", "Pileta")

const hab2Op2Ob = new Habitacion(4, "2", "1", "Si", "Si", "Balcón")

const hab3Op1Ob = new Habitacion(5, "3", "2", "Si", "Si", "Pileta")

const hab3Op2Ob = new Habitacion(6, "3", "2", "Si", "Si", "Balcón")

const hab4Op1Ob = new Habitacion(7, "4", "2", "Si", "Si", "Pileta")

const hab4Op2Ob = new Habitacion(8, "4", "2", "Si", "Si", "Balcón")


const habitaciones = [hab1Op1Ob, hab1Op2Ob, hab2Op1Ob, hab2Op2Ob, hab3Op1Ob, hab3Op2Ob, hab4Op1Ob, hab4Op2Ob]

// Adicionales
class Adicional {
    constructor(id, tit, item1, item2, item3,precio, disp){
        this.id = id
        this.tit = tit
        this.item1 = item1
        this.item2 = item2
        this.item3 = item3
        this.precio = precio
        this.disp = disp
    }
}

const adicComida= new Adicional(1, "Incluir desayuno, merienda y cena", "Desayuno", "Merienda", "Cena", 500, true)

const adicTour = new Adicional(2,"Tours por cordoba","Salida a Carlos Paz", "Trekking Cerro Uritorco", "Recorrido mirador Icho Cruz", 600, true)

const adicEvento = new Adicional(3, "Eventos del hotel", "Juegos para grandes y chicos", "Pase libre al salon de eventos", "Uso parque interno del hotel", 700, true )

const adicionales = [adicComida, adicTour, adicEvento]

const adicionalAll = {id: 0, tit: "All inclusive", item1: "Incluye dasayuno merienda y cena", item2: "Tours por Córdoba", item3: "Pase libre a eventos del hotel", precio: 1000}


// Muestro en el html todas las habitaciones
mostrarHabs(habitaciones)


// Uso del localSotrage
let habitacionElegida = JSON.parse(localStorage.getItem("habitacionElegida")) ?? [] 


//Formulario principal
formUsuario.addEventListener(`submit`, (e)=>{
    e.preventDefault()
    let nombre = document.getElementById(`nombreUs`).value

    let apellido = document.getElementById(`apelUs`).value

    let usuario = nombre + " " + apellido

    let fechaDeLlegada = document.getElementById(`fechLlUs`).value

    let fechaDeIda = document.getElementById(`fechIdaUs`).value

    let diasEstadia = document.getElementById(`diasEstUs`).value

    let cantPer = document.getElementById(`cantPerUs`).value

    
    let cliente = {usuario: usuario, fechaDeLlegada: fechaDeLlegada, fechaDeIda: fechaDeIda, diasEstadia: diasEstadia, cantPer: cantPer}

    //En caso de que ingrese un valor incorrecto se llamara a una funcion u otra
    if(1 <= cantPer && cantPer <= 4){
        adicionalCliente(cantPer,adicionalAll, habitacionE)
        datosFamlia(cantPer)

        let botonAdicionalNo = document.getElementById('adicionalNo')


        botonAdicionalNo.addEventListener('click', ()=>{
            adicionalesCliente(cantPer)
        })

        let btnRserva = document.getElementById('btnReserva')

        btnRserva.addEventListener('click', ()=>{
            verReserva(cliente, habitacionE, ticket, cantPer, diasEstadia)
        })
        
    }
    else{
        errorCarga()
        
        
    }
})


// Formulario con los datos de los acompañantes
formDatos.addEventListener('click', (e) =>{
    e.preventDefault()
})

cantPerUs.addEventListener(`change`, () =>{

    let filtro = cantPerUs.value

    let filtroHab = habitaciones.filter( habitacion => habitacion.dormitorio.includes(filtro))

    tablaHab.innerHTML = ' '

    
    if ( 1 <= filtro && filtro <= 4){
        mostrarHabs(filtroHab)
        
        }
    
    else{
        errorCarga()
    }

    // En caso de que elija habitacion con filtro
    filtroHab.forEach(habitacion =>{
        document.getElementById(`boton${habitacion.id}`).addEventListener("click", ()=>{
            event.target.disabled=true
            habitacionE = habitacion
            
            localStorage.setItem("Habitacion", JSON.stringify(habitacionE))
            
            })
        })


    

}) 

// En caso de que elija habitacion sin filtro
habitaciones.forEach(habitacion =>{
    document.getElementById(`boton${habitacion.id}`).addEventListener("click", ()=>{
            event.target.disabled=true
            habitacionE = habitacion
            localStorage.setItem("Habitacion", JSON.stringify(habitacionE))
            console.log(habitacionE)
            })

})


function mostrarHabs(habitaciones){
    
    tablaHab.innerHTML+='<h2 class=" text-center">Habitaciones recomendadas</h2> '

    habitaciones.forEach(habitacion => {
        tablaHab.innerHTML += `
        
            <div class="card margin bg-dark border border-white" style="width: 18rem; id= habitacion${habitacion.id}">
                <div class="card-body">
                    <h4 class="card-title">Habitacion ${habitacion.id}</h4>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-dark colorTextCard">${habitacion.dormitorio} Cama/s  </li>
                    <li class="list-group-item bg-dark colorTextCard">${habitacion.banio} Baño/s</li>
                    <li class="list-group-item bg-dark colorTextCard">Cocina: ${habitacion.cocina}</li>
                    <li class="list-group-item bg-dark colorTextCard">Living: ${habitacion.living}</li>
                    <li class="list-group-item bg-dark colorTextCard">Pileta/Balcon: ${habitacion.plus}</li>
                </ul>
                <div class= "btn btn-dark" >
                        <button class="btn btn-primary" type="submit" id ="boton${habitacion.id}">Reservar</button>
                </div>
                
            </div>
        
    `
    
    })
}


function errorCarga(){
    tablaHab.innerHTML = `
        <div class="card margin bg-dark colorTextCard" style="width: 40rem;">
            <div class="card-body">
                <h3 class="card-title">Valor ingresado incorrecto, porfavor ingreselo nuevamente</h3>
            </div>
        </div>
        `
    formDatos.innerHTML = ''
    paquetesCliente.innerHTML = ' '
}


function datosFamlia(cantPer){
    
    formDatos.innerHTML = " "

    if (cantPer < 2){
        formDatos.innerHTML = " "
    }
    else if (cantPer == 2){
        formDatos.innerHTML += `<span class="tituloDatosFamiliar">Datos de acompañante</span>`}
    
    else{
        formDatos.innerHTML += `<span class="tituloDatosFamiliar">Datos de acompañantes</span>`

    }

    
    for (let i=1; i<cantPer; i++){
        
        formDatos.innerHTML += `
        <div class="row" id="idFam${i}">    
            <div class="col-md-4">
                <label for="validationCustom01" class="form-label" required>Nombre</label>
                <input type="text" class="form-control" id="nombreFam${i}">
            </div>
            <div class="col-md-4">
                <label for="validationCustom02" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="apellFam${i}">
            </div>
            <div class="col-md-4">
                <label for="validationCustom02" class="form-label">Edad</label>
                <input type="text" class="form-control" id="edadFam${i}">
            </div>
        </div>
        <div class= "d-flex justify-content-center col-md-12">
        <button class="btn btn-dark prueba1" type="submit" id= "btnCarga${i}">Cargar</button>
        </div>
        `
        
        

        
    }

    for (let i=1; i<cantPer; i++){
        btnCarga = document.getElementById(`btnCarga${i}`)
        
        btnCarga.addEventListener(`click`, ()=>{

        let idFam = i 

        let nomAcom = document.getElementById(`nombreFam${i}`).value

        let apellAcom = document.getElementById(`apellFam${i}`).value

        let edadAcom = document.getElementById(`edadFam${i}`).value

        let datosPersona = {idFam: idFam, nomAcomp: nomAcom, apellAcom: apellAcom, edadAcom: edadAcom}

        datosAcompaniante.push(datosPersona)
        Toastify({
            text: `Datos de ${nomAcom} cargados correctamente`,
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                color:"white",
                background: "black",
            },
            onClick: function(){}
        }).showToast();
        console.log(datosAcompaniante)
        
    })

    
}
    

}

function adicionalCliente(cantP, adicionalAll){

    paquetesCliente.innerHTML =`
        <div class="separador d-flex justify-content-center">
            <div class="separador card margin bg-dark border border-white " style="width: 18rem;">
                
                <div class="card-body">
                    <h4 class="card-title">All inclusive</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-dark colorTextCard">Incluye desayuno, almuerzo y cena</li>
                    <li class="list-group-item bg-dark colorTextCard">Tours por córdoba</li>
                    <li class="list-group-item bg-dark colorTextCard">Pase libre a eventos del hotel</li>
                </ul>
                
                <div class= "btn btn-dark" >
                    <button class="btn btn-primary" type="submit" id ="adicionalSi">Deseo agregar paquete</button>
                </div>
                <div class= "btn btn-dark" >
                    <button class="btn btn-primary" type="submit" id ="adicionalNo">No, gracias</button>
                </div>
                <div class="d-flex justify-content-center">
                    <span>Costo adicional $ ${cantP*adicionalAll.precio}</span>
                </div>
            </div>
        </div>
    
    `
    let adicionalSi = document.getElementById('adicionalSi')
    
    //El event hace que el cliente solo pueda agregar un solo paquete y no mas
    adicionalSi.addEventListener('click', ()=>{
        event.target.disabled=true
        ticket.push(adicionalAll)
    })

}
function adicionalesCliente(cantP){
        

        const tarjetasAdic = adicionales.map(element=>{
            const {id, tit, item1, item2, item3,precio, disp} = element;
            if(disp == false){
                return `<div class="separador card margin bg-dark border border-white " style="width: 18rem;">
            
            <div class="card-body">
                <h4 class="card-title">${tit}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-dark colorTextCard">${item1}</li>
                <li class="list-group-item bg-dark colorTextCard">${item2}</li>
                <li class="list-group-item bg-dark colorTextCard">${item3}</li>
            </ul>
            
            <div class= "btn btn-dark" >
                <button disabled="true" class="btn btn-light" type="submit" id ="Si${id}">Paquete Agregado</button>
            </div>
        </div>`
            }
            else{
                return `<div class="separador card margin bg-dark border border-white " style="width: 18rem;">
            
            <div class="card-body">
                <h4 class="card-title">${tit}</h4>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-dark colorTextCard">${item1}</li>
                <li class="list-group-item bg-dark colorTextCard">${item2}</li>
                <li class="list-group-item bg-dark colorTextCard">${item3}</li>
            </ul>
            
            <div class= "btn btn-dark" >
                <button class="btn btn-primary" type="submit" id ="Si${id}">Deseo agregar paquete</button>
            </div>
            <div class="d-flex justify-content-center">
                <span>Costo adicional $ ${cantP*precio}</span>
            </div>
        </div>`
            }
            
        })

        paquetesCliente.innerHTML= tarjetasAdic.join("")

        botonadicionales()

}

function botonadicionales(){
    
    adicionales.forEach((adicionales)=>{
        document.querySelector(`#Si${adicionales.id}`).addEventListener('click', ()=>{
            event.target.disabled=true
            ticketCliente(adicionales)
        })
    })

}

function ticketCliente(adicionales){
    const sumarAdic = ticket.some((element)=>element.id === adicionales.id)
    console.log(sumarAdic)

    if(sumarAdic){
        
        ticket.map(element=>{
            if(element.id === adicionales.id ){
                element.disp = false
                return element
            }
        })
    }
    else{
        ticket.push(adicionales)
    }
    
}

function verReserva(cliente, habitacionE, ticket, cantPer, diasEstadia){
    datosClienteFinal.innerHTML =`
    <h5 class="titTicket">Datos del titular</h5>
    <div class="d-flex row">
        <span>${cliente.usuario}</span>
        <span>Fecha de llegada: ${cliente.fechaDeLlegada}</span>
        <span>Fecha de ida: ${cliente.fechaDeIda}</span>
        <span>Dias de estadia/s: ${cliente.diasEstadia}</span>
        <span>Acompañantes: ${cliente.cantPer}</span>
    </div>
    <h5 class="titTicket">Habitacion Elegida</h5>
    <div class="d-flex row">
        <span>Dormitorio/s: ${habitacionE.dormitorio}</span>
        <span>Baños: ${habitacionE.dormitorio}</span>
        <span>Cocina: ${habitacionE.dormitorio}</span>
        <span>Living: ${habitacionE.dormitorio}</span>
        <span>Plus: ${habitacionE.dormitorio}</span>
    </div>   
    `
    adicionalesFinal(ticket)
    if(1 < cantPer && cantPer < 5){
        acompUsuario(datosAcompaniante)
    }

    totalRserva(costoPorDia, cantPer, diasEstadia)

    finProyecto()
}

function adicionalesFinal(){
    datosClienteFinal.innerHTML+= `<h5 class="titTicket">Adicionales elegidos/s</h5>
                                    `
    const adicF = ticket.map(element=>{
        const {id, tit, item1, item2, item3,precio, disp} = element
        console.log(precio+precio)
        return `<div>
                <span>${tit}</span>
                </div>`
    })

    datosClienteFinal.innerHTML+= adicF.join("")
}

function acompUsuario(){
    datosClienteFinal.innerHTML+= `<h5 class="titTicket">Datos de acompañante/s</h5>`
    const acomp = datosAcompaniante.map(element=>{
        const {idFam: idFam, nomAcomp: nomAcom, apellAcom: apellAcom, edadAcom: edadAcom} = element
        return `<div>
                <span>${nomAcom} ${apellAcom} de ${edadAcom} años</span>
                </div>`
                
    })
    datosClienteFinal.innerHTML+= acomp.join("")
}

function finProyecto(){
    // Uso de librerias
    terminarJs.addEventListener('click', ()=>{
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: '¿Estas seguro de hacer tu reserva?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No, quiero seguir viendo mi reserva!',
            confirmButtonText: 'Si, si lo estoy!',
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    '¡Reserva realizada!',
                    // Cuando el cliente carga todos los datos se reinicia la pagina en 3segs para simular el envio de datos
                    setInterval(()=>{location.reload()}, 3000)
            )
            } else if (
            result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire(
                'Segui mirando tranquilo ;)'
            )
            }
        })
        
    })
    
}

function totalRserva(costoPorDia,cantPer, diasEstadia){
    precioFinal = 0
    ticket.forEach((ticket =>{
        precioFinal +=ticket.precio    }))

    return datosClienteFinal.innerHTML+=`
    <div>
        <span>Total Reserva $ ${(costoPorDia*cantPer*diasEstadia) + (precioFinal*cantPer)} </span>
    </div>
    `
    
}

// Uso del fetch 
//Tuve problemas para usar el api del clima porque nunca me habilitaron la key para usarla, asi que aplico json
fetch("clima.json")
.then(response => response.json())
.then((data)=>{
    data.forEach((element) =>{
        datosJson.innerHTML = `
        <span>${element.temp}°</span>
        <span class="espacioClima">${element.desc}</span>
        <img src="${element.img}" class="imgNube espacioClima">
        <span class="espacioClima">${element.ubi}</span>
        
        `
    })
})


setInterval(()=>{
    fetch("api.json")
    .then(response => response.json())
    .then((data)=>{
        data.forEach((element) =>{
            datosJson.innerHTML = `
            <span>${element.temp}°</span>
            <span class="espacioClima">${element.desc}</span>
            <img src="${element.img}" class="imgNube espacioClima">
            <span class="espacioClima">${element.ubi}</span>
            
            `
        })
    })
}, 3000)