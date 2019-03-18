import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductTableRow from './ProductTableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class ProductTable extends Component {

    componentDidMount() {
        this.getProductTypeItems();
    }
    
    getProductTypeItems = () => {
        const action = { type: 'FETCH_PRODUCT_TYPE' };
        this.props.dispatch(action);
    }

    render() {
        return (
            <div>
                <Paper>
                 {/* This is needed for id */}
                    {/* {this.props.state.productType.productTypeReducer[0] !== undefined && JSON.stringify(this.props.state.productType.productTypeReducer[0].id)} */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                                {this.props.products.map((productTypeItem, i) => {
                                    return (
                                        <ProductTableRow productTypeItem={productTypeItem} key={i} />
                                    )
                                })}

                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    products: state.productType,
})

export default connect(mapStatetoProps)(ProductTable);