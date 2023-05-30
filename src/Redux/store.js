import { createStore, combineReducers } from "redux";
import TodosSlice from "../features/Todos/todosSlice";
import FiltersSlice from "../features/Footer/filtersSlice";

const reducers = {
    todos: TodosSlice,
    filters: FiltersSlice
}

const rootReducer = combineReducers(reducers)

const store = createStore(rootReducer)
export default store;