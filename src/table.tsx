import { Button } from 'primereact/button';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Table({ data, columns }){
	return (
	    <DataTable value={data} stripedRows tableStyle = {{minWidth: '50rem'}}>
	    {columns.map((col, i) => (
		    <Column key={col.field} field={col.field} header = {col.header}/>
	    ))}
	    </DataTable>
	)
}

