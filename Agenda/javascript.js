let agregarBoton = document.getElementById('boton-agregar-tarea')
let form = document.getElementById('agregar-tarea')
let listaTareas = document.getElementById('lista-tareas')

class Tarea {
  constructor(tarea,prioridad) {
    this.tarea = tarea
    this.prioridad = prioridad
  }
}

function cargarTareas() {
  let tareas = JSON.parse(localStorage.getItem('tareas')) || []
  listaTareas.innerHTML = ''
  
  let filtro = document.getElementById('filtro').value

  let tareasFiltradas = tareas.filter(t => {
    if (filtro === 'todas') return true
    return t.prioridad === filtro
  })

  tareasFiltradas.forEach((e)=> {
    let indexReal = tareas.indexOf(e)
    listaTareas.innerHTML += `
      <div class='tarea'>
        <div class='prioridad-${e.prioridad}'>${e.prioridad}</div>
        ${e.tarea}
        <button onclick='eliminarTarea(${indexReal})'><img src='/media/remove.png'></button>
  </div>` 
  })

  let contador = document.getElementById('contador')
  contador.innerHTML = `Viendo ${tareasFiltradas.length} de ${tareas.length} pendientes`
}

agregarBoton.addEventListener('click', function(e){
  e.preventDefault()

  let tarea = document.getElementById('tarea').value
  let prioridad = document.getElementById('prioridad').value

  if(!tarea || !prioridad) {
    alert("Por favor completá todos los campos.")
    return
  }

  let nuevaTarea = new Tarea(tarea, prioridad)

  let tareas = JSON.parse(localStorage.getItem('tareas')) || []

  tareas.push(nuevaTarea)

  localStorage.setItem('tareas', JSON.stringify(tareas))

  form.reset()
  cargarTareas()
})


function eliminarTarea(index) {
  let tareas = JSON.parse(localStorage.getItem('tareas')) || []

  tareas.splice(index, 1)

  localStorage.setItem('tareas', JSON.stringify(tareas))

  cargarTareas()
}

let frase = document.getElementById('frase')

var xhr = new XMLHttpRequest()

xhr.open('GET', 'https://www.positive-api.online/phrase/esp')

xhr.onload = function() {
    if (xhr.status === 200) {
      let respuesta = JSON.parse(xhr.response)
      frase.innerHTML = respuesta.text
    }
    else {
      frase.innerHTML = "No se pudo cargar la frase"
    }
}
xhr.send()

cargarTareas()

let filtroCambio = document.getElementById('filtro')

filtroCambio.addEventListener('change', () => {
  cargarTareas()
})