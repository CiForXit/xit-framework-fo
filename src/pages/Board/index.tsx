import React, {useEffect, useState} from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
//import './styles.css';
import Button from '@mui/material/Button';

import BoardService from 'apis/BoardService';
import {IApiResponse} from '../../types/ApiModel';
import {ILoginReponse} from '../../apis/AuthService';
import Alert from 'react-s-alert';
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from '../../types/AuthModel';
import XitCmm from '../../commons/XitCmm';
import ROUTES from '../../commons/constants/routes';
import {gridOptions} from 'commons/AgGridCmm';
import {IBoard, IParam} from 'types/Data';
import Select from 'react-select';
import {AgEvent, AgGridEvent, ColDef, IDatasource, IGetRowsParams} from 'ag-grid-community';
import {GridReadyEvent} from 'ag-grid-community/dist/lib/events';
import 'commons/style/agGrid.css';

const Board = () => {
  const [gridApi, setGridApi] = useState();
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

  const columnDefs: ColDef[] = [
    {
      headerName: 'ㅁ',
      //field: 'name',
      minWidth: 60,
      cellClass: 'cell-wrap-text',
      headerCheckboxSelection: true,
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

  gridOptions.columnDefs = columnDefs;
  //gridOptions.rowData = rowData;

  const boardService = new BoardService();

  const onGridReady = (e) => {
    //setGridApi(e.api);

    setGridApi(e.api);
    setGridColumnApi(e.columnApi);

    const updateData = (response) => {
      const dataSource: IDatasource = {
        rowCount: -1,
        getRows: function (params) {
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
      e.api.setDatasource(dataSource);
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
    //};
    //}, [boardService, param, updateData]);

    // boardService
    //   //.boardList({page: gridOptions.api.paginationGetCurrentPage() + 1, size: gridOptions.api.paginationGetPageSize()})
    //   .boardList({page: 1, size: 100})
    //   .then((res) => {
    //     if (!res.success) {
    //       return;
    //     }
    //     if (res.data) updateData(res);
    //   });
  };

  const getBoardList = () => {
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
      gridOptions.api!.setDatasource(dataSource);
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
  };

  useEffect(() => {
    getBoardList();
  }, [getBoardList]);

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

  return (
    <>
      <div style={{width: '100%', height: '100%'}}>
        <div
          id="myGrid"
          style={{
            height: '800px',
            width: '100%'
          }}
          className="ag-theme-alpine">
          <AgGridReact
            {...gridOptions}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
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
