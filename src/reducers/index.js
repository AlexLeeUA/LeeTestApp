

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
                loading: false,
                movies: action.payload,
            };
        
        case 'MOVIES_FOUND': 
            return {
                ...state,
                loading: false,
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
                loading: false,
                movie: action.payload
            }
        }

        case 'DATA_REQUESTED': {
            return {
                ...state,
                loading: true
            }
        }

        default: 
            return state;
    };
    
}


export default reducer;