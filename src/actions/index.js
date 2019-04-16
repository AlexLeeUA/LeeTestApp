

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

export {
    moviesLoaded,
    imagePathLoaded
};