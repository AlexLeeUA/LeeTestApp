import React, {Component} from 'react';
import MoviestoreService from '../../services/moviestore-service';


export default class MovieList extends Component {

    moviestoreService = new MoviestoreService();

    state = {
        title: null,
        overview: null,
        release: null
    };

    constructor() {
        super();
        this.updateMovie();
    }

    updateMovie() {
        this.moviestoreService
            .getItem(8827)
            .then((movie) => {
                this.setState({
                    title: movie.title,
                    overview: movie.overview,
                    release: movie.release
                })
            })
    }

    render() {

        const { title, overview, release } = this.state;

        return (
            <ul>
                <li>
                   {title}                   
                </li>  
                <li>
                   {overview}                   
                </li>  
                <li>
                   {release}
                </li>                       
            </ul>
        )        
    }
}

