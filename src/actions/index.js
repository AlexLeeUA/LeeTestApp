
const changeListInc = (listId) => {
    return {
        type: 'INC',
        payload: listId
    }
}

const changeListDec = (listId) => {
    return {
        type: 'DEC',
        payload: listId
        }
    }


const moviesLoaded = (newMovies) => {
    return {
        type: 'MOVIES_LOADED',
        payload: newMovies
    }
}

const imagePathLoaded = (path) => {
    return {
        type: 'IMAGE_PATH_LOADED',
        payload: path
    }
}

const moviesFound = (text) => {
    return {
        type: 'MOVIES_FOUND',
        payload: text
}
}

const movieIdGot = (id) => {
    return {
        type: 'MOVIE_ID_GOT',
        payload: id
    }
}

const movieLoaded = (movie) => {
    return {
        type: 'MOVIE_LOADED',
        payload: movie
    }
}

const dataRequested = () => {
    return {
        type: 'DATA_REQUESTED'
    }
}


export {
    moviesLoaded,
    imagePathLoaded,
    changeListInc,
    changeListDec,
    moviesFound,
    movieIdGot,
    movieLoaded,
    dataRequested
};