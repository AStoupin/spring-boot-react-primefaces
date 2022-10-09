import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {DataTable} from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';

import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {clients: []};
        this.remove = this.remove.bind(this);

    }

    componentDidMount() {
        fetch('/clients')
            .then(response => response.json())
            .then(data => this.setState({clients: data}));
    }

    async remove(id) {
        await fetch(`/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== id);
            this.setState({clients: updatedClients});
        });
    }


    render() {
        const actionBodyTemplate = (rowData) => (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={()=>this.props.history.push( "clients/" + rowData.id)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={()=>this.remove(rowData.id)} />
            </React.Fragment>
        );
        const toolBarButtons = (rowData) => (
            <React.Fragment>
                <Button label="Add" onClick={()=> this.props.history.push("/clients/new")} />
            </React.Fragment>
        );

        return (
            <div>
                <Toolbar left={toolBarButtons}  />
                <DataTable value={this.state.clients} responsiveLayout="scroll" stripedRows
                           sortMode="multiple"
                           filterDisplay="menu"
                           selectionMode="single"
                           resizableColumns
                >
                    <Column field="id" header="Code" sortable></Column>
                    <Column field="name" header="Name" filter  sortable></Column>
                    <Column field="email" header="Category" filter  sortable></Column>
                    <Column header="Actions" body={actionBodyTemplate} exportable={false}
                            style={{minWidth: '8rem'}}></Column>
                </DataTable>
            </div>
        )

    }
}

export default withRouter(ClientList);