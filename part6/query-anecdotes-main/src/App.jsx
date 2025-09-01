import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQueryClient , useMutation } from '@tanstack/react-query'
import axios
 from 'axios'
 import { useNotification } from './NotificationContext'
const getAnecdotes = async () => {
  const res = await axios.get('http://localhost:3001/anecdotes')
  return res.data
}

const updateAnecdote = async (id, newAnecdote) => {

  const res = await axios.put(`http://localhost:3001/anecdotes/${id}`, newAnecdote)
  return res.data
}



const App = () => {
  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

 const queryClient = useQueryClient()

 const updateAnecdoteMutation  = useMutation(
  {
    mutationFn : ({id, newAnecdote}) =>updateAnecdote(id , newAnecdote),
    onSuccess: () => {
  queryClient.invalidateQueries(['anecdotes'])
}

  }
 )
  if (isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if (isError) {
    return <div>Error fetching anecdotes</div>
  }

   const handleVote = (anecdote) => {
  updateAnecdoteMutation.mutate({
    id: anecdote.id,
    newAnecdote: { ...anecdote, votes: anecdote.votes + 1 }
    
  })

  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
