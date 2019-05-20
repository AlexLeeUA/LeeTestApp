import React, {Component} from 'react';
import {connect} from 'react-redux';
import {shippingAddressAdded} from '../../actions';
import './checkout.css'


const ShippingAddressForm = () => {
    return (
        <div id="form">
            <div>
                <input id="firstName" type="text" placeholder="First Name" />
                <input id="lastName" type="text" placeholder="Last Name"/>
            </div>
            <div>
                <input id="address1" type="text" placeholder="Address 1"/>
                <input id="address2" type="text" placeholder="Address 2"/>
            </div>
            <div>
                <input id="city" type="text" placeholder="City"/>
            <select id="state">
                <option>State...</option>
                <option>Alaska</option>
                <option>Arkansas</option>
                <option>Arisona</option>
            </select>
                <input id="zip" type="text" placeholder="Zip-code"/>
            </div>
            <div>
                <input id="phone" type="text" placeholder="Phone number"/>
            </div>
        </div>
    )    
}    

const ShippingAddressAdded = ({shippingAddress, checkoutItems}) => {
   return (
        <div id='result'>
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
            <div>{shippingAddress.phone}</div>
        </div>
    )
    
}

const CheckoutItems = ({checkoutItems}) => {
    return (
        <div>
            <ul>
                {checkoutItems.map((item) => {
                    return <li key={item.id}>{item.title}</li>}
                )}
            </ul>
        </div>     
    )   
}

class Checkout extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.checkoutItems !== prevProps.checkoutItems) {
            document.getElementById('result').style.display = 'none';
        }
    }


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
        const {checkoutItems, shippingAddress, shippingAddressAdded} = this.props;
        
        return (        
            
            <div className="checkout">
                <fieldset className="payment-method"><legend className="block-title">Payment Method</legend>
                    <form>
                        <ul>
                            <li><label><input type="radio" name="type" /><span>CreditCard</span></label></li>
                            <li><label><input type="radio" name="type" /><span>PayPal</span></label></li>
                        </ul>                      
                    </form>
                </fieldset>
    
                <fieldset className="shipping-address">
                    <legend className="block-title">Shipping Address</legend>
                    <ShippingAddressForm shippingAddress={shippingAddress} shippingAddressAdded={shippingAddressAdded}/>
                    <ShippingAddressAdded shippingAddress={shippingAddress} checkoutItems={checkoutItems} />  
                    <button onClick={this.shippingAddressAdd}>Add the address</button>
                    <button onClick={this.shippingAddressChange}>Change the address</button>                
                </fieldset>

                <fieldset className="purchasing-items">
                    <legend className="block-title">Items</legend>
                    <CheckoutItems checkoutItems={checkoutItems}/>       
                </fieldset>
    
                <div>
                    <button>Confirm and Pay</button>
                </div>       
            
            </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        shippingAddress: state.shippingAddress,
        checkoutItems: state.checkoutItems,
}
}

const mapDispatchToProps = {
    shippingAddressAdded
}
   

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

