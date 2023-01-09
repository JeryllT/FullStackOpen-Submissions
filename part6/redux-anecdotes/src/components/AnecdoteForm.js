import { useDispatch } from "react-redux"
import { addNote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const addNotes = (e) => {
        e.preventDefault()
        const newAnec = e.target.anecdote.value
        dispatch(addNote(newAnec))
      }

    return (
    <>
        <h2>create new</h2>
        <form onSubmit={addNotes}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
        </form>
    </>
    )
}

export default AnecdoteForm