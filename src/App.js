import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import Header from './components/Header/Header';
import Formulario from './components/Formulario/Formulario';
import MiOrg from './components/MiOrg';
import Equipo from './components/Equipo';
import Footer from './components/Footer';

function App() {
  const [mostrarFormulario, actualizarMostrar] = useState(false)
  const [colaboradores, actualizarColaboradores] = useState([{
    id: uuid(),
    equipo:"Front End",
    foto:"https://github.com/josersb.png",
    nombre:"Jose Serrano",
    puesto:"Desarrollador web",
    fav: true
  },
  {
    id: uuid(),
    equipo:"Data Science",
    foto:"https://github.com/github-peter-diaz.png",
    nombre:"Peter Díaz",
    puesto:"Desarrolador de software e instructor",
    fav: false
  },
  {
    id: uuid(),
    equipo:"Programación",
    foto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZpN4Y2Jpu4au3Mk1KpntgtsOA9_EHbtBHyw&usqp=CAU",
    nombre:"Antony Aparicio",
    puesto:"Intructor y delegado de relaciones interinstitucionales",
    fav: false
  },
  {
    id: uuid(),
    equipo:"Móvil",
    foto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXRhm8JqJ3NyKhvCz05Grt8SYwZlidw1KxXPQ9AvC7zq3TEaS7AWGwTJ3MxrwGQe__hLY&usqp=CAU",
    nombre:"Carmelita Perez",
    puesto:"Desarroladora de aplicaciones moviles",
    fav: false
  },
  {
    id: uuid(),
    equipo:"Devops",
    foto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNksQlJrTce93QqqMq6ZCeIUiIlvpqMd7wCRyHklLZL9BEfKf3YO7vZ_kSc3v5soL-ps&usqp=CAU",
    nombre:"Petra Galindo",
    puesto:"Desarroladora de software e instructor",
    fav: false
  }])

  const [equipos, actualizarEquipos] = useState([
    {
      id: uuid(),
      titulo: "Programación",
      colorPrimario: "#57C278",
      colorSecundario: "#D9F7E9"
    },
    {
      id: uuid(),
      titulo: "Front End",
      colorPrimario: "#82CFFA",
      colorSecundario: "#E8F8FF"
    },
    {
      id: uuid(),
      titulo: "Data Science",
      colorPrimario: "#A6D157",
      colorSecundario: "#F0F8E2"
    },
    {
      id: uuid(),
      titulo: "Devops",
      colorPrimario: "#E06B69",
      colorSecundario: "#FDE7E8"
    },
    {
      id: uuid(),
      titulo: "UX y Diseño",
      colorPrimario: "#DB6EBF",
      colorSecundario: "#FAE9F5"
    },
    {
      id: uuid(),
      titulo: "Móvil",
      colorPrimario: "#FFBA05",
      colorSecundario: "#FFF5D9"
    },
    {
      id: uuid(),
      titulo: "Innovación y Gestión",
      colorPrimario: "#FF8A29",
      colorSecundario: "#FFEEDF"
    }
  ])


  //Ternario --> condicion ? seMuestra : noSeMuestra
  //condicion && seMuestra

  const cambiarMostrar = () =>{
    actualizarMostrar(!mostrarFormulario)
  }

  //Registrar colaborador

  const registrarColaborador = (colaborador) => {
    console.log("Nuevo colaborador", colaborador)
    //spread operator
    actualizarColaboradores([...colaboradores, colaborador])
  }

  //Eliminar colaborador
  const eliminarColaborador = (id) => {
    console.log("Eliminar colaborador", id)
    const nuevosColaboradores = colaboradores.filter((colaborador) => colaborador.id !== id)
    actualizarColaboradores(nuevosColaboradores)
  }

  //Actualizar color de equipo
  const actualizarColor = (color, id) =>{
    console.log("Actualizar: ", color, id)
    const equiposActualizados = equipos.map((equipo) => {
      if (equipo.id === id){
        equipo.colorPrimario = color
      }

      return equipo
    })

    actualizarEquipos(equiposActualizados)
  }

  //Crear equipo
  const crearEquipo = (nuevoEquipo) =>{
    console.log(nuevoEquipo)
    actualizarEquipos([...equipos, { ...nuevoEquipo, id: uuid() }])
  }

  const like = (id) => {
    console.log("like", id)
    const colaboradoresActualizados = colaboradores.map((colaborador) => {
      if (colaborador.id === id){
        colaborador.fav = !colaborador.fav
      }
      return colaborador
    })

    actualizarColaboradores(colaboradoresActualizados)
  } 

  return (
    <div>
      <Header />
      {/* {mostrarFormulario ? <formulario />} : <></> */}
      {
        mostrarFormulario && <Formulario 
          equipos={equipos.map((equipo) => equipo.titulo)}
          registrarColaborador={registrarColaborador}
          crearEquipo={crearEquipo}
          />
      }

      <MiOrg cambiarMostrar={cambiarMostrar} />

      {
      /* La siguiente linea de comandos es la forma tradicional de hacer el recorrido y retornar el valor de una arrow fuction */
      /*  equipos.map( (equipo) => {
          return <Equipo datos={equipo} key={equipo.titulo} />
          } ) 
      */

      /* Alternativamente a esta usaremos una forma mas simplificada para que quede una linea de codigo mas prolija sin afectar el funcionamiento de la misma, quedando de la siguiente manera: */

        equipos.map((equipo) => <Equipo 
          datos={equipo} 
          key={equipo.titulo} 
          colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
          eliminarColaborador={eliminarColaborador}
          actualizarColor={actualizarColor}
          like={like}
          />
        )
      /* Una de las propiedades de las arrow function es que sino colocamos las llaves:{} lo que sigue a la => sera lo que automaticamente se regresara como resultado de la function*/
      }

      <Footer />

    </div>
  );
}

export default App;
