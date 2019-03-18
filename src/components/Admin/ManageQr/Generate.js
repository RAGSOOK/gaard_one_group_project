import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TextField, FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Generate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productType: '',
            quantity: '',

        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PRODUCT_TYPE' });
    }

    // handles the change of the product type drop down menu
    changeInput = (event) => {
        this.setState({
            ...this.state,
            productType: event.target.value,
        })
        // console.log(event.target.name, event.target.value);
        // const formName = event.target.name;
        // const changeValue = event.target.value;
        // this.setState({
        //     ...this.state,
        //     formName: changeValue,
        // })
        // console.log(this.state);
        console.log(event.target.value, 'ewwewewee')
        console.log(this.state, '!!!!!')

    }//end

    // handles the change of the quantity
    changeQunantity = (event) => {
        console.log(event.target.value);
        const inputquanity = parseInt(event.target.value);
        this.setState({
            ...this.state,
            quantity: inputquanity
        })
    }//end


    // submits the data to the productSaga to generate unique plots based on admin inputs
    submitGenerate = (event) => {
        event.preventDefault();
        console.log('submit', this.state);
        const action = ({
            type: 'ADD_PRODUCT', payload: this.state
        });
        this.props.dispatch(action);
    }//end

    render() {

        return (
            <FormControl className="form-control">
                Create QR Code
                <TextField
                    id="select-product"
                    select
                    label=""
                    className="input"
                    value={this.state.productType}
                    onChange={this.changeInput}
                    helperText="product"
                    margin="normal"
                    fullWidth
                    autoComplete="off"

                >
                    {this.props.products.map((product, i) => (
                        <MenuItem key={i}
                            value={product}>
                            {product.product_name}
                        </MenuItem>))}
                </TextField>
                <TextField
                    id="select-quanity"
                    className="quantity"
                    onChange={this.changeQuantity}
                    helperText="quantity"
                    margin="normal"
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 40000 } }}
                    autoComplete="off"
                />
                <Button variant="contained" 
                 color="primary"
                 onClick={this.submitGenerate}>
                    Submit
                </Button>
            </FormControl>
        );

    }
}
// maps redux to products
const mapReduxStoreToProps = reduxStore => ({
    ...reduxStore,
    products: reduxStore.productType,
});

export default connect(mapReduxStoreToProps)(withStyles(styles)(Generate));
