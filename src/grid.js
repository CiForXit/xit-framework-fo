import React, {Component, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {gridOptions} from './commons/AgGridCmm';

const GridRecord = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([
    {
      equipment: '장비 1',
      ip: '192:167:52:1',
      os: 'window',
      company: 'samsung',
      template: 'SNMP',
      hw: 60,
      active: '활성화',
      proxy: '127.0.0.1:8991',
      user: 'kim'
    },

    {
      equipment: '장비 2',
      ip: '192:152:53:1',
      os: 'mac',
      company: 'apple',
      template: 'ICMP',
      hw: 120,
      active: '비활성화',
      proxy: '127.0.0.1:8991',
      user: 'jin'
    },

    {
      equipment: '장비 3',
      ip: '192:161:54:1',
      os: 'linux',
      company: 'lg',
      template: 'SNMP',
      hw: 180,
      active: '활성화',
      proxy: '127.0.0.1:8991',
      user: 'seong'
    }
  ]);
  const [columnDefs, setColumnDefs] = useState([
    {headerName: '장비명', field: 'equipment'},
    {headerName: 'Public Ip', field: 'ip'},
    {headerName: 'OS', field: 'os'},
    {headerName: '제조사', field: 'company'},
    {headerName: '템플릿 그룹', field: 'template'},
    {headerName: 'HW 자원', field: 'hw'},
    {headerName: '상태', field: 'active'},
    {headerName: '프록시', field: 'proxy'},
    {headerName: '사용자', field: 'user'}
  ]);

  //const {columnDefs, data} = this.state;
  //const gridProps = {...gridOptions, columnDefs: columnDefs, rowData: data};
  gridOptions.columnDefs = columnDefs;
  gridOptions.rowData = rowData;

  // gridOptions.onGridReady = (params) => {
  //   setGridApi(params.api);
  //   setGridColumnApi(params.columnApi);
  //
  //   const updateData = (data) => params.api.setRowData(data);
  //
  //   fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  //     .then((resp) => resp.json())
  //     .then((data) => updateData(data));
  //
  //   //axios.get("")
  //   //.then((res) => updateData(res.data))
  // };

  return (
    <div className="ag-theme-alpine" style={{width: '97vw', height: '48vh'}}>
      {/*<AgGridReact headerHeight="30" columnDefs={columnDefs} rowData={data} />*/}
      <AgGridReact {...gridOptions} />
    </div>
  );
};

export default GridRecord;
