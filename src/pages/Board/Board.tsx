import React, { useEffect, useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.min.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.min.css';
//import './styles.css';
import Button from '@mui/material/Button';

import BoardService from 'apis/BoardService';
import { IApiResponse } from '../../types/ApiModel';
import { ILoginReponse } from '../../apis/AuthService';
import Alert from 'react-s-alert';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../../types/AuthModel';
import XitCmm from '../../commons/XitCmm';
import ROUTES from '../../commons/constants/routes';
import { getGridOptions } from 'commons/AgGridCmm';
import { IBoard, IParam } from 'types/Data';
import Select from 'react-select';
import {
  AgEvent,
  AgGridEvent,
  ColDef,
  ColumnApi,
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  PaginationChangedEvent
} from 'ag-grid-community';
import { GridReadyEvent } from 'ag-grid-community/dist/lib/events';
import axios from 'axios';
import { BOARD_LIST_URL } from '../../commons/constants/ApiUrl';
import Layout from '../Layout/Layout';
import Paperbase from '../paperbase/Paperbase';
//import 'commons/style/agGrid.css';

const Board1 = (props) => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [columnApi, setColumnApi] = useState<ColumnApi>();
  const [rowData, setRowData] = useState<[IBoard]>();
  //const [selectedRows, setSelectedRows] = useState([]);
  const [btndisabled, setBtnDisabled] = useState(true);
  const [selectedPageSize, setSelectedPageSize] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  //const BoardService = new BoardService();

  const options = [
    { value: '2', label: '2' },
    { value: '5', label: '5' },
    { value: '10', label: '10' }
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
    { headerName: '게시판코드', field: 'ciCode' },
    { headerName: '글번호', field: 'ciContentno' },
    { headerName: '제목', field: 'ciTitle', editable: true },
    { headerName: '사용자ID', field: 'ciId' },
    { headerName: '사용자 비번', field: 'ciPwd' },
    { headerName: '사용자 이름', field: 'ciName' },
    { headerName: '등록일', field: 'ciNalja' },
    { headerName: '등록시간', field: 'ciTime' },
    { headerName: '조회수', field: 'ciHit' },
    { headerName: 'ref', field: 'ciRef' },
    { headerName: 'step', field: 'ciStep' },
    { headerName: 'level', field: 'ciRevel' },
    { headerName: '비번', field: 'ciPass' },
    { headerName: 'email', field: 'ciEmail' },
    { headerName: '내용', field: 'ciContents' },
    { headerName: 'IP', field: `ciIp` }
  ];

  const gridOptions: GridOptions = getGridOptions();
  gridOptions.columnDefs = columnDefs;
  gridOptions.rowData = rowData;

  const boardService = new BoardService();

  const update = async (page, pageSize): Promise<IDatasource> => {
    const res: IApiResponse<any> = await fetch(
      //`https://jsonplaceholder.typicode.com/comments?_start=${params.startRow}&_end=${params.endRow}`
      `http://localhost:8090/api/v1/ctgy/board?page=${page}&size=${pageSize}`
    ).then((r) => r.json());

    return {
      getRows: async function (params) {
        console.log(params);
        console.log(`page=${page}`);
        // Fetch our data
        //const response = await fetch(
        //`https://jsonplaceholder.typicode.com/comments?_start=${params.startRow}&_end=${params.endRow}`
        //  `http://localhost:8090/api/v1/ctgy/board?page=${page}&size=${pageSize}`
        //);

        // If something happened in our fetch, call failCallback()
        // if (!response.ok) {
        //   params.failCallback();
        //   return;
        // }
        //
        // // Get the rows in this batch
        // const res = await response.json();

        // Get total count of rows (returns "500" in this example)
        const totalCount = res.count; //response.headers.get("X-Total-Count"

        // If number of rows > 500, set lastRow = 500
        // otherwise set it to -1 and continue loading when scrolling down
        var lastRow = params.endRow >= totalCount ? totalCount : -1;
        // Tell the grid we got our rows ready
        params.successCallback(res.data, lastRow);
      }
    };
  };

  const onGridReady = async (e: GridReadyEvent) => {
    //setGridApi(e.api);

    setGridApi(e.api);
    setColumnApi(e.columnApi);
    e.api.setDatasource(await update(page, pageSize));

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
      //e.api.setRowData(response.data);
      //     setRowData(response.data);
    };
  };

  function getBoardList() {
    const param: IParam<any> = {
      page: page,
      size: 100 //pageSize
    };

    boardService.boardList(param).then((res) => {
      if (!res.success) {
        return;
      }
      if (res.data) {
        setRowData(res.data);
      }
    });
  }

  //useEffect(() => {
  //  getBoardList();
  //}, [page, pageSize]);

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

  async function onPageSizeChanged(e: PaginationChangedEvent) {
    //let value = (document.getElementById('page-size') as HTMLInputElement).value;
    //let value = document.getElementById('page-size').value;
    //setSelectedPageSize(selectedOption);
    //console.log(e);
    const curPage = e.api.paginationGetCurrentPage();
    console.log(`curPage=${curPage}`);
    if (page != curPage + 1) {
      console.log(`>>curPage=${curPage},page=${page}`);
      setPage((prevPage) => curPage + 1);
      console.log(`>>page=${page}`);
      //e.api.paginationGoToPage(curPage);
      e.api.setDatasource(await update(page, pageSize));
    }

    //gridOptions.api?.paginationGoToPage(0)
    //gridOptions.api!.paginationSetPageSize(Number('5'));
    //gridOptions?.api?.onPaginationChanged;
  }

  return (
    <Layout>
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%'
        }}
        className="ag-theme-balham-dark">
        <AgGridReact
          {...gridOptions}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          //onPaginationChanged={onPageSizeChanged}
          onCellEditingStopped={(e) => {
            onCellValueChanged(e);
          }}
        />
      </div>
    </Layout>
  );
};

export default Board1;
