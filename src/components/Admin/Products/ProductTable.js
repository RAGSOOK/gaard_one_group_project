import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductTableRow from './ProductTableRow';
import ProductTableDeactivate from './ProductTableDeactivate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




class ProductTable extends Component {

    componentDidMount() {
        this.getProductTypeItems();
        this.fetchDeactivatedItems();
    }
    
    getProductTypeItems = () => {
        const action = { type: 'FETCH_PRODUCT_TYPE' };
        this.props.dispatch(action);
    }

    fetchDeactivatedItems = () => {
        const action = { type: 'FETCH_DEACTIVATED_PRODUCT_TYPE' };
        this.props.dispatch(action);
    };

    render() {

        //filter out inactive products
        const activeProducts = this.props.products.filter( (product) => product.active);

        //filter out active products
        const deactivatedProducts = this.props.products.filter((product) => !product.active);

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
                                <TableCell>De-Activate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                                {activeProducts.map((productTypeItem, i) => {
                                    return (
                                        <ProductTableRow productTypeItem={productTypeItem} key={i} />
                                    )
                                })}

                        </TableBody>
                    </Table>
                </Paper>
                <br></br>

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
                                <TableCell>De-Activate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {deactivatedProducts.map((deactProducts, i) => {
                                return (
                                    <ProductTableDeactivate deactProducts={deactProducts} key={i} />
                                )
                            })}

                        </TableBody>
                    </Table>
                </Paper>            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    products: state.productType,
})

export default connect(mapStatetoProps)(ProductTable);