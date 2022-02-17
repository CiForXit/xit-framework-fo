import React, {useEffect, useState} from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.min.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.min.css';
//import './styles.css';
import Button from '@mui/material/Button';

import BoardService from 'apis/BoardService';
import {IApiResponse} from '../../types/ApiModel';
import {ILoginReponse} from '../../apis/AuthService';
import Alert from 'react-s-alert';
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from '../../types/AuthModel';
import XitCmm from '../../commons/XitCmm';
import ROUTES from '../../commons/constants/routes';
import {getGridOptions} from 'commons/AgGridCmm';
import {IBoard, IParam} from 'types/Data';
import Select from 'react-select';
import {
  AgEvent,
  AgGridEvent,
  ColDef,
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  PaginationChangedEvent
} from 'ag-grid-community';
import {GridReadyEvent} from 'ag-grid-community/dist/lib/events';
import axios from 'axios';
import {BOARD_LIST_URL} from '../../commons/constants/ApiUrl';
//import 'commons/style/agGrid.css';

const Board = () => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState<[IBoard]>();
  //const [selectedRows, setSelectedRows] = useState([]);
  const [btndisabled, setBtnDisabled] = useState(true);
  const [selectedPageSize, setSelectedPageSize] = useState(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  //const BoardService = new BoardService();

  const options = [
    {value: '2', label: '2'},
    {value: '5', label: '5'},
    {value: '10', label: '10'}
  ];

  const tempData = [
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
  ];

  const columnDefs: ColDef[] = [
    {
      headerName: 'ㅁ',
      //field: 'name',
      minWidth: 60,
      cellClass: 'cell-wrap-text',
      //headerCheckboxSelection: true,
      checkboxSelection: true
    },
    {
      headerName: 'No.',
      valueGetter: 'node.rowIndex+1',
      minWidth: 60
    },
    {headerName: '게시판코드', field: 'ciCode'},
    {headerName: '글번호', field: 'ciContentno'},
    {headerName: '제목', field: 'ciTitle', editable: true},
    {headerName: '사용자ID', field: 'ciId'},
    {headerName: '사용자 비번', field: 'ciPwd'},
    {headerName: '사용자 이름', field: 'ciName'},
    {headerName: '등록일', field: 'ciNalja'},
    {headerName: '등록시간', field: 'ciTime'},
    {headerName: '조회수', field: 'ciHit'},
    {headerName: 'ref', field: 'ciRef'},
    {headerName: 'step', field: 'ciStep'},
    {headerName: 'level', field: 'ciRevel'},
    {headerName: '비번', field: 'ciPass'},
    {headerName: 'email', field: 'ciEmail'},
    {headerName: '내용', field: 'ciContents'},
    {headerName: 'IP', field: `ciIp`}
  ];

  const gridOptions: GridOptions = getGridOptions();
  gridOptions.columnDefs = columnDefs;
  gridOptions.rowData = rowData;

  const boardService = new BoardService();

  const onGridReady = (e) => {
    //setGridApi(e.api);

    setGridApi(e.api);
    setGridColumnApi(e.columnApi);

    const updateData = (response) => {
      /*
      const dataSource: IDatasource = {
        rowCount: -1,
        getRows: function (params) {
          //console.log('asking for ' + params.startRow + ' to ' + params.endRow);
          setTimeout(function () {
            const rowsThisPage = response.data!.slice(params.startRow, params.endRow);
            let lastRow = -1;
            if (response.data!.length <= params.endRow) {
              lastRow = response.data!.length; //res.paginator?.totalCount;
              //lastRow = response.paginator?.totalCount;
            }
            setPage(params.startRow / pageSize + 1);
            params.successCallback(rowsThisPage, lastRow);
          }, 500);
        }
      };
      //rowModelType이 serverSide / infinite
      //e.api.setDatasource(dataSource);
*/

      // rowModelType : clientSide
      e.api.setRowData(response.data);
      //gridApi?.setDatasource(dataSource);
    };

    const param: IParam<any> = {
      page: page,
      size: 100
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    //useEffect(() => {
    //return () => {
    boardService
      //.boardList({page: gridOptions.api.paginationGetCurrentPage() + 1, size: gridOptions.api.paginationGetPageSize()})
      .boardList(param)
      .then((res) => {
        if (!res.success) {
          return;
        }
        if (res.data) {
          updateData(res);
          //e.api.setRowData({data: {...res.data}});
          //gridApi?.setRowData(res.data!.data);
        }
      });

    // axios.get('http://localhost:8090' + BOARD_LIST_URL, {params: {page: 1, size: 10}}).then((res) => {
    //   //gridApi.setRowData(res.data.data);
    //   updateData(res);
    //   // rowModelType이 clientSide인 경우 사용
    //   //e.api.setRowData(res.data.data);
    // });
  };

  function getBoardList() {
    const updateData = (response) => {
      const dataSource: IDatasource = {
        rowCount: -1,
        getRows: (params: IGetRowsParams) => {
          //console.log('asking for ' + params.startRow + ' to ' + params.endRow);
          setTimeout(function () {
            const rowsThisPage = response.data!.slice(params.startRow, params.endRow);
            let lastRow = -1;
            if (response.data!.length <= params.endRow) {
              //lastRow = response.data!.length; //res.paginator?.totalCount;
              lastRow = response.paginator?.totalCount;
            }
            setPage(params.startRow / pageSize + 1);
            params.successCallback(rowsThisPage, lastRow);
          }, 500);
        }
      };
      //      gridOptions.api!.setDatasource(dataSource);
      //gridOptions.api!.setRowData(response.data);
      gridApi!.setRowData(response.data);
      //setRowData(response.data);
    };

    const param: IParam<any> = {
      page: page,
      size: pageSize
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    //useEffect(() => {
    //return () => {
    boardService
      //.boardList({page: gridOptions.api.paginationGetCurrentPage() + 1, size: gridOptions.api.paginationGetPageSize()})
      .boardList(param)
      .then((res) => {
        if (!res.success) {
          return;
        }
        if (res.data) updateData(res);
      });
  }

  // useEffect(() => {
  //   getBoardList();
  // }, [page, pageSize]);

  const handlePagination = (e: PaginationChangedEvent) => {
    console.log(`${e.newPage}>>>>>>>>>>>>>page = ${page}`);
    if (page === 1) e.newPage = false;
    console.log(`${e.newPage}>>>>>>>>>>>>>page = ${page}`);

    //if (e.newPage) setPage(page + 1);
    //getBoardList()
  };

  const onSelectionChanged = () => {
    //setSelectedRows(gridApi!.getSelectedRows());
  };

  const onCellValueChanged = (e) => {
    console.log('changed', e.data);
  };

  function onPageSizeChanged(selectedOption) {
    //let value = (document.getElementById('page-size') as HTMLInputElement).value;
    //let value = document.getElementById('page-size').value;
    setSelectedPageSize(selectedOption);
    gridOptions.api!.paginationSetPageSize(Number('5'));
    //gridOptions?.api?.onPaginationChanged;
  }

  function createServerSideDatasource(server: any): IServerSideDatasource {
    return {
      getRows: function (params) {
        console.log('[Datasource] - rows requested by grid: ', params.request);

        // get data for request from our fake server
        var response = server.getData(params.request);

        // simulating real server call with a 500ms delay
        setTimeout(function () {
          if (response.success) {
            // supply rows for requested block to grid
            params.success({rowData: response.rows});
          } else {
            params.fail();
          }
        }, 500);
      }
    };
  }

  function createFakeServer(allData: any[]) {
    return {
      getData: function (request: IServerSideGetRowsRequest) {
        // take a copy of the data to return to the client
        var requestedRows = allData.slice();

        return {
          success: true,
          rows: requestedRows
        };
      }
    };
  }

  return (
    <>
      <div style={{width: '100%', height: '100%'}}>
        <div
          id="myGrid"
          style={{
            height: '800px',
            width: '100%'
          }}
          className="ag-theme-balham-dark">
          <AgGridReact
            {...gridOptions}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            // onPaginationChanged={handlePagination}
            onCellEditingStopped={(e) => {
              onCellValueChanged(e);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Board;
