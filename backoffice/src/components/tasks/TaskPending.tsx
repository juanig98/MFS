import './TaskPending.scss'

export default function TaskPending() { 
  
   return ( 
      <div className='task-pending'>
      <b className='ws-nowrap'>Tareas pendientes: </b>
      <ul>
      <li>Tarea 1</li>
      <li>Tarea 2</li>
      <li>Tarea 3</li>
      <li>Tarea 4</li>
      </ul>
      </div> 
   )
}