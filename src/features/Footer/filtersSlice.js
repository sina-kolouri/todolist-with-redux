import { produce } from 'immer';
const initState = {
    status: "All",
    colors: []
}
const FiltersSlice = produce((state, action) => {
    switch (action.type) {
        case "filters/status":
            state.status = action.payload
            break;
        case "filters/colors":
            switch (action.payload.changeType) {
                case "add":
                    state.colors.push(action.payload.color)
                    break;
                case "remove":
                    state.colors = state.colors.filter(color => {
                        return color !== action.payload.color;
                    })
                    break;
            }
    }
}, initState)

export default FiltersSlice;
