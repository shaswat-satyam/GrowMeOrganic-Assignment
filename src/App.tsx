import { useState } from 'react'
import { Button } from 'primereact/button';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function App() { const [count, setCount] = useState(0)

  return (
    <>
       <p> The count is {count}</p>
	<Button onClick = { () => setCount((count) => count + 1)}>
	Hello There!
        </Button>

	<div>
	<DataTable>
	  <Column field="code" Header="Code"></Column>
	</DataTable>
	</div>
    </>
  )
}

export default App
