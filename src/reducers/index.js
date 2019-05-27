

const initialState = {
    movieListId: 1,
    movies: [],
    imagePath: null,
    searchReq: '',
    movieId: '',
    movie: {},
    loading: true,
    defaultPrice: 14.99,
    defaultQuantity: 1,
    cartItems: [
        {
            id: 1,
            title: 'Guardians of the Galaxy',
            quantity: 1,
            path: '/y31QB9kn3XSudA15tV7UWQ9XLuW.jpg',
            price: 0.00
        }
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

const updateCartItems = (cartItems, item, idx) => {
    
    if (item.quantity === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx+1),
        ]
    }

    if (idx === -1) {
        return [
            ...cartItems,
            item
        ]
    }

    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx+1),
    ]
}

const updateItem = (movie, item={}, defaultPrice, count) => {
    
    const {
        id = movie.id,
        title = movie.title,
        quantity = 0,
        path = movie.path,
        price = 0.00
    } = item;

    return {
        id,
        title,
        quantity: quantity + count,
        path,
        price: price + defaultPrice*count
    }
}

const updateOrder = (state, id, count) => {
    const {movies, cartItems, defaultPrice} = state;
    const movie = movies.find((movie) => id === movie.id);
    const itemIndex = cartItems.findIndex(({id}) => id === movie.id);
    const item = cartItems[itemIndex];

    const newItem = updateItem(movie, item, defaultPrice, count);

    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    }
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'DFT':
            return {
                ...state,
                movieListId: state.movieListId*0 + 1
            }        
        
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
            return updateOrder(state, action.payload, 1)

        case 'ITEM_REMOVED_FROM_CART':
            return updateOrder(state, action.payload, -1)

        case 'ITEM_DELETED_FROM_CART':
            const index = action.payload;
                           
            return {
                ...state,
                cartItems: [
                    ...state.cartItems.slice(0, index),
                    ...state.cartItems.slice(index+1),
                ],
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