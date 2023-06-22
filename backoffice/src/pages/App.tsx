import './App.scss'
import TaskPending from '../components/tasks/TaskPending'
import ProductCounter from '../components/products/ProductCounter'
import ProductList from '../components/products/ProductList'
import UserCard from '../components/users/UserCard'

function App() { 

  return (
    <> 
      <div className='secure-zone'>
        <div className='d-flex flex-row bd-highlight gap-3 py-3'>
          <div className='vgap-3'>
          <h1>La app que 3</h1>
            <ProductCounter/>
            <TaskPending />
          </div>
          <div>
            <ProductList/>
          </div>
          <div>
            <UserCard/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
