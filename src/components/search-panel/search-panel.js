import React, {Component} from 'react';
import {moviesFound} from '../../actions';
import {connect} from 'react-redux';

import './search-panel.css';

class SearchPanel extends Component {

    onSearchChange = (e) => {
        const searchReq = e.target.value;
        this.props.moviesFound(searchReq);       
    }    

    render() {
    
        const { searchReq, movies } = this.props;

        return (
            <div className="search-panel">
                <div className="result"> Total results: {movies.length} </div>
                <input className="search" type="text" placeholder="Search" value={searchReq} onChange={this.onSearchChange}></input>
            </div>
        )
}
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        searchReq: state.searchReq
    }     
}

const mapDispatchToProps = {
    moviesFound
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);