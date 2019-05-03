import React, {Component} from 'react';
import {changeListInc, changeListDec} from '../../actions';
import {connect} from 'react-redux';
import './shop-footer.css';


class Button extends Component {

    componentDidUpdate() {
        this.update()
    }

    update = () => {
        const {movieListId} = this.props;
        console.log(movieListId)
        if (movieListId<2) {
            return document.getElementById('dec').style.display = 'none';
         }
            return document.getElementById('dec').style.display = '';
    }

    render() {  
        const {changeListDec} = this.props
        return (
            <button id="dec" onClick={changeListDec} style={{display: "none"}}>&#60;</button>
        )
    }
}


class ShopFooter extends Component  {   

    render() {
        const {movieListId, changeListInc, changeListDec} = this.props;
        return (
            <div className="list-number">
                <Button changeListDec={changeListDec} movieListId={movieListId}/>
                <div className="num">{movieListId}</div>
                <button onClick={changeListInc}>&#62;</button>          
            </div>
    )
    }    
}

const mapStateToProps = (state) => {
    return {
        movieListId: state.movieListId,
    }
}

const mapDispatchToProps = {
    changeListInc,
    changeListDec
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopFooter);