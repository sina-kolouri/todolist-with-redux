import { produce } from "immer";
const initState = {
    entities: {}
}

const TodosSlice = produce((state, action) => {
    switch (action.type) {
        case "todos/todoAdded":
            const todo = action.payload
            state.entities[todo.id] = todo
            break;

        case "todos/todoToggled":
            const toggledId = action.payload
            state.entities[toggledId].completed = !state.entities[toggledId].completed
            break;

        case "todos/todoColors":
            const { colorClicked, id } = action.payload
            state.entities[id].color = colorClicked
            break;

        case "todos/todoDeleted":
            const deletedId = action.payload
            delete state.entities[deletedId]
            break;

        case "todos/todoMarkAll":
            Object.values(state.entities).forEach(todo => {
                state.entities[todo.id].completed = true;
            });
            break;

        case "todos/todoClear":
            Object.values(state.entities).forEach(todo => {
                if (todo.completed) {
                    delete state.entities[todo.id]
                }
            });
            break;
        default: return state;
    }
}, initState)
export default TodosSlice;