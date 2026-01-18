import { useState } from 'react'
import { Button } from 'primereact/button';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function App() { const [count, setCount] = useState(0)
  const products = [
	  {"code":1, "name":"Hello", "category":"game", "quantity":5},
	  {"code":1, "name":"Hello", "category":"game", "quantity":5},
	  {"code":1, "name":"Hello", "category":"game", "quantity":5},
  ]

  const columns = [
	  {"field":"code","header":"Code"},
	  {"field":"name","header":"Name"},
	  {"field":"category","header":"Category"},
	  {"field":"quantity","header":"Quantity"},
  ];
  return (
    <>
	<div>
	    <DataTable value={products} stripedRows tableStyle = {{minWidth: '50rem'}}>
	    {columns.map((col, i) => (
		    <Column key={col.field} field={col.field} header = {col.header}/>
	    ))}
	    </DataTable>
	</div>
    </>
  )
}

export default App
