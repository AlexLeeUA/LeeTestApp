

const initialState = {
    movieListId: 1,
    movies: [],
    imagePath: null,
    searchReq: '',
    movieId: '',
    movie: {},
    loading: true
}


const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'INC':
            return {
                ...state,
                movieListId: state.movieListId + 1
            };
        
        case 'DEC':
            return {
                ...state,
                movieListId: state.movieListId - 1
                       
            };

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
        
        case 'MOVIES_FOUND': 
            return {
                ...state,
                searchReq: action.payload
            }

        case 'MOVIE_ID_GOT': {
            return {
                ...state,
                movieId: action.payload
            }
        }

        case 'MOVIE_LOADED': {
            return {
                ...state,
                movie: action.payload
            }
        }

        case 'LOADING': {
            return {
                ...state,
                loading: action.payload
            }
        }

        default: 
            return state;
    };
    
}


export default reducer;