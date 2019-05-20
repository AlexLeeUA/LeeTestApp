

const initialState = {
    movieListId: 1,
    movies: [],
    imagePath: null,
    searchReq: '',
    movieId: '',
    movie: {},
    loading: true,
    cartItems: [
        {id: 1,
        title: 'Gift Movie',
        quantity: 1,
        path: '/cezWGskPY5x7GaglTTRN4Fugfb8.jpg',
        price: 0}
    ],
    shippingAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    },
    checkoutItems: []
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

        case 'ITEM_ADDED_TO_CART':
            const id = action.payload;
            const movie = state.movies.find((movie) => id === movie.id);
            const itemIndex = state.cartItems.findIndex(({id}) => id === movie.id);
            const item = state.cartItems[itemIndex];

            let newItem;

            if(item) {
                newItem = {
                    ...item,
                    quantity: item.quantity + 1,
                    price: item.price + 100
                }
            } else {
                newItem = {
                    id: movie.id,
                    title: movie.title,
                    quantity: 1,
                    path: movie.path,
                    price: 100
                }
            }

            if (itemIndex < 0) {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        newItem
                    ]
                }
            } else {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems.slice(0, itemIndex),
                        newItem,
                        ...state.cartItems.slice(itemIndex + 1),
                    ]
                }
            }
            
        case 'CART_RELOADED':
            return {
                ...state,
                cartItems: action.payload
            }

        case 'SHIPPING_ADDRESS_ADDED':
            return {
                ...state,
                shippingAddress: action.payload
            }

        case 'ITEM_ADDED_TO_CHECKOUT':
            const id2 = action.payload;
            const movie2 = state.movies.find((movie) => id2 === movie.id);
            
            return {
                ...state,
                shippingAddress: [],
                checkoutItems: [movie2]
            }

        case 'ITEMS_ADDED_TO_CHECKOUT':
            return {
                ...state,
                shippingAddress: [],
                checkoutItems: action.payload
            }



        default: 
            return state;
    };
    
}


export default reducer;