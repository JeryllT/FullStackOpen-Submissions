import {configureStore} from '@reduxjs/toolkit'
import anecdoteReducer from './anecdoteReducer'

export default configureStore({
    reducer: {
        anecdoteReducer: anecdoteReducer,
    }
})