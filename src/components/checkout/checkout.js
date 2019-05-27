import React, {Component} from 'react';
import {connect} from 'react-redux';
import {shippingAddressAdded} from '../../actions';

import './checkout.css'
import './../shopping-cart-table/shopping-cart-table.css';

const dashBoard = ({cartItems}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;            
    const totalPrice = cartItems.map(({price}) => price).reduce(reducer)
    
        return (
            <tbody>
                <tr>
                    <td className="sub-total">Sub-total:</td>
                    <td style={{textAlign: "right"}}className="sub-total-price">${totalPrice}</td>
                </tr>
                <tr>
                    <td className="shipping">Shipping:</td>
                    <td className="shipping-value">Free</td>
                </tr>
                <tr>
                    <td className="grand-total">Grand Total:</td>
                    <td className="grand-total-value">${totalPrice}</td>
                </tr>
            </tbody>
        )
}

const ShippingAddressForm = () => {
    return (
        <div id="form">
            <div>
                <input id="firstName" type="text" placeholder="First Name"/>
                <input id="lastName" type="text" placeholder="Last Name"/>
            </div>
                       <div>
                <input id="address1" type="text" placeholder="Address 1"/>
                <input id="address2" type="text" placeholder="Address 2"/>
            </div>

            <div className="city-state-zip">
                <input id="city" type="text" placeholder="City" style={{width: "190px", marginRight: "20px"}}/>
                <select id="state" style={{width: "180px", marginRight: "20px"}}>
                    <option>State</option>
                    <option>Alaska</option>
                    <option>Arkansas</option>
                    <option>Arisona</option>
                </select>
                <input id="zip" type="text" placeholder="Zip-code" style={{width: "190px", marginRight: "20px"}}/>
            </div>
            <div>
                <input id="phone" type="text" placeholder="Phone number"/>
            </div>
        </div>
    )    
}    

const ShippingAddressAdded = ({shippingAddress}) => {
   return (
        <div id="result">
            <div>
                <span>{shippingAddress.firstName}</span>
                <span>{shippingAddress.lastName}</span>
            </div>
            <div>
                <span>{shippingAddress.address1}</span>
                <span>{shippingAddress.address2}</span>
            </div>
            <div>
                <span>{shippingAddress.city}</span>
                <span>{shippingAddress.state}</span>
                <span>{shippingAddress.zip}</span>
            </div>
            <div style={{marginBottom: "0px"}}>{shippingAddress.phone}</div>
        </div>
    )   
}

const CheckoutItems = ({checkoutItems, imagePath}) => {

    return (
        <div>
            <ul className="checkout-items">
                {checkoutItems.map((movie) => {
                    return <li key={movie.id} className="item">
                               <img className="picture" src={`${imagePath}${movie.path}`} alt='pic'/>
                                <div className="title">{movie.title.toUpperCase()}</div>
                                <div className="quantity">
                                    <span>Quantity: {movie.quantity} </span>
                                </div>
                                <div className="price">${movie.price}</div>   
                            </li>
                    }
                )}
            </ul>
        </div>     
    )   
}

class Checkout extends Component {

    
    shippingAddressChange = () => {
        if (this.props.shippingAddress) {
            document.getElementById('form').style.display = '';
            document.getElementById('result').style.display = 'none';
        } else {
            document.getElementById('form').style.display = 'none';
            document.getElementById('result').style.display = '';
        }
    }
  
    shippingAddressAdd = () => {
        const address = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address1: document.getElementById('address1').value,
            address2: document.getElementById('address2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            phone: document.getElementById('phone').value
        }
        this.props.shippingAddressAdded(address);

        document.getElementById('form').style.display = 'none';
        document.getElementById('result').style.display = ''
        
    }
   
    render() {
        const {checkoutItems, shippingAddress, shippingAddressAdded, cartItems, imagePath} = this.props;
        
        return (        
        
            <div className="checkout">
                <div className="payment-method">
                    <div className="title">Payment Method</div>                    
                    <form>
                        <ul>
                            <li className="container">
                                <label><input type="radio" name="type" className="credit-card" id="credit-card" /></label>
                                <span>CreditCard</span>
                            </li>
                            <li className="container"><label><input type="radio" name="type" className="pay-pal"/><span>PayPal</span></label></li>
                        </ul>                      
                    </form>
                </div>
    
                <div className="shipping-address">
                    <div className="title">Shipping Address</div>
                    <ShippingAddressForm shippingAddress={shippingAddress} shippingAddressAdded={shippingAddressAdded}/>
                    <ShippingAddressAdded shippingAddress={shippingAddress} checkoutItems={checkoutItems} />  
                    <button className="add-the-address" onClick={this.shippingAddressAdd}>Add the address</button>
                    <button className="change-the-address" onClick={this.shippingAddressChange}>Change the address</button>                
                </div>

                <div className="confirm-and-pay">
                    <div className="confirm-and-pay-info">
                        <div className="title">Order Summary</div>
                        <div className="total-dashboard">
                            <table className="checkout-table">
                                {dashBoard({cartItems})}
                            </table>
                        </div>
                        <CheckoutItems checkoutItems={checkoutItems} imagePath={imagePath} />
                    </div>
                    <button className="confirm-and-pay-button">Confirm and Pay</button>
                </div>
            </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        shippingAddress: state.shippingAddress,
        checkoutItems: state.checkoutItems,
        cartItems: state.cartItems,
        imagePath: state.imagePath
    }
}

const mapDispatchToProps = {
    shippingAddressAdded
}
   

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

