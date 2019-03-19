import React, { Component } from 'react';
import { connect } from 'react-redux';
// import QRCode from 'qrcode-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import QrTableRow from './QrTableRow';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';



class QrTable extends Component {


    componentDidMount(){
        this.props.dispatch({type:'FETCH_PRODUCT'});
    }


    render() {
       
    // 
    
        return (
         <Paper>
             {/* {JSON.stringify(this.props.reduxStore.product)}; */}
             
             <Table>
                 <TableHead>
                     <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Square Feet</TableCell>
                        <TableCell>QR Printed</TableCell>
                        <TableCell><button onClick={this.exportPDFWithComponent}>Export QR to PDF</button></TableCell>
                     </TableRow>
                 </TableHead>
                
                 <TableBody>
                            {this.props.reduxStore.product.map((qrProduct,i)=>(
                            <QrTableRow key={i} qrproduct={qrProduct}   />
                            ))}
                 </TableBody>
               
             </Table>
         </Paper>
        );
    }
}
const mapReduxStoreToProps = reduxStore => ({reduxStore});
export default connect(mapReduxStoreToProps)(QrTable);