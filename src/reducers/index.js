

const initialState = {
    movies: [],
    imagePath: null
}



const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'IMAGE_PATH_LOADED':
            return {
                ...state,
                imagePath: action.payload
            };

        case 'MOVIES_LOADED': 
            return {
                ...state,
                movies: action.payload,
            };

        default: 
            return state;
    };
    
}



export default reducer;