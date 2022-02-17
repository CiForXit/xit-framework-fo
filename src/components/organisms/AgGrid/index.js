import React, {useState} from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
//import './styles.css';
import Button from '@mui/material/Button';
import reqApi from '../../../apis/ApiService';
import {IApiResponse} from '../../../types/ApiModel';
import {IBoard} from '../../../types/Data';
import {BOARD_LIST_URL} from '../../../commons/constants/ApiUrl';
import axios from 'axios';

const AgGrid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [btndisabled, setBtnDisabled] = useState(true);
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    //console.table(params);
    console.log(params);

    // const updateData = (data) => params.api.setRowData(data);
    //
    // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //   .then((resp) => resp.json())
    //   .then((data) => updateData(data));

    const p = {page: 1, size: 10};
    axios.get('http://localhost:8090' + BOARD_LIST_URL, {params: p}).then((res) => {
      params.api.setRowData(res.data.data);
    });

    //axios.get("")
    //.then((res) => updateData(res.data))
  };

  const onSelectionChanged = () => {
    const data = gridApi.getSelectedRows();

    if (data.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
    setSelectedRows(gridApi.getSelectedRows());
  };

  const onCellValueChanged = (e) => {
    console.log('changed', e.data);
  };
  return (
    <>
      <div style={{width: '100%', height: '100%'}}>
        <div
          id="myGrid"
          style={{
            height: '600px',
            width: '100%'
          }}
          className="ag-theme-alpine">
          <h1>editable table</h1>

          <AgGridReact
            rowData={rowData}
            rowSelection={'multiple'}
            suppressRowClickSelection={false}
            defaultColDef={{
              editable: true,
              sortable: true,
              minWidth: 100,
              filter: true,
              resizable: true,
              floatingFilter: true,
              flex: 1
            }}
            sideBar={{
              toolPanels: ['columns', 'filters'],
              defaultToolPanel: ''
            }}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            onCellEditingStopped={(e) => {
              onCellValueChanged(e);
            }}>
            <AgGridColumn
              headerName="..HELLO."
              //headerCheckboxSelection={true}
              checkboxSelection={true}
              floatingFilter={false}
              suppressMenu={true}
              minWidth={50}
              maxWidth={50}
              width={50}
              flex={0}
              resizable={false}
              sortable={false}
              editable={false}
              filter={false}
              suppressColumnsToolPanel={true}
            />
            <AgGridColumn headerName="Participant">
              <AgGridColumn field="ciCode" minWidth={170} />
              <AgGridColumn field="country" minWidth={150} />
            </AgGridColumn>
            <AgGridColumn field="ciCode" />
            <AgGridColumn headerName="Medals">
              <AgGridColumn field="total" columnGroupShow="closed" filter="agNumberColumnFilter" width={120} flex={0} />
              <AgGridColumn field="gold" columnGroupShow="open" filter="agNumberColumnFilter" width={100} flex={0} />
              <AgGridColumn field="silver" columnGroupShow="open" filter="agNumberColumnFilter" width={100} flex={0} />
              <AgGridColumn field="bronze" columnGroupShow="open" filter="agNumberColumnFilter" width={100} flex={0} />
            </AgGridColumn>
            <AgGridColumn field="year" filter="agNumberColumnFilter" />
          </AgGridReact>
        </div>
      </div>
    </>
  );
};

export default AgGrid;
