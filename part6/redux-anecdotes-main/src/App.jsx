import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisibiltyFilter from './components/VisibilityFilter'

const App = () => {
  return (
    <div>
      <VisibiltyFilter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
