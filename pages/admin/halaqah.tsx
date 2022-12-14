
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { MultiSelect } from 'primereact/multiselect';

export default function Halaqah() {
    const columns = [
        {field: 'name', header: 'Name'},
        {field: 'category', header: 'Category'},
        {field: 'quantity', header: 'Quantity'}
    ];

    const [selectedColumns, setSelectedColumns] = useState(columns);
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onColumnToggle = (event:any) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter(col => selectedColumns.some((sCol: { field: any; }) => sCol.field === col.field));
        setSelectedColumns(orderedSelectedColumns);
    }

    const header = (
        <div style={{ textAlign:'left' }}>
            <MultiSelect value={selectedColumns} options={columns} optionLabel="header" onChange={onColumnToggle} style={{width:'20em'}}/>
        </div>
    );

    const columnComponents = selectedColumns.map(col=> {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <div>
            <div className="card">
                <DataTable value={products} header={header} responsiveLayout="scroll">
                    <Column field="code" header="Code" />
                    {columnComponents}
                </DataTable>
            </div>
        </div>
    );
}
                 