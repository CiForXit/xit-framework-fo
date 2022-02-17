import {GridOptions, RowClassParams, RowStyle} from 'ag-grid-community';
import {RefObject, useCallback} from 'react';
import {AgGridReact} from 'ag-grid-react';

export const getGridOptions = () => {
  return gridOptions;
};

export const gridOptions: GridOptions = {
  //columnDefs: [],
  //rowData: [],
  defaultColDef: {
    editable: false,
    //width: 100,
    minWidth: 100,
    sortable: true,
    // 검색조건
    filter: false,
    resizable: true,
    //floatingFilter: true,
    flex: 1

    /* rowModelType이 infinite인 경우 지원 안됨 */
    //headerCheckboxSelection: true,
  },
  sideBar: {
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: ''
  },

  //enableColResize: true,
  //enableSorting: true,
  //enableFilter: true,

  // cellStyle: (params) => {
  //   if (typeof params.value === 'number') {
  //     return {cellStyle: {textAlign: 'right'}};
  //   } else {
  //     return null;
  //   }
  // },

  /* 정렬기능 강제 여부 */
  enableRangeSelection: true,
  /* 선택허용 여부 : row 선택 background 색상 반전 : false */
  suppressRowClickSelection: true,
  animateRows: true,
  /* 가로스크롤 여부 */
  //suppressHorizontalScroll: true,

  // 데이타가 없는 경우 보여줄 메세지
  localeText: {noRowsToShow: '조회 결과가 없습니다.'},

  tooltipMouseTrack: true,

  ////////////////////////////////////////////////////////////////
  // pagination properties
  ////////////////////////////////////////////////////////////////
  // serverSide / clientSide / infinite / viewPort
  //rowModelType: 'clientSide',
  pagination: true,
  paginationPageSize: 10,
  // 그리드에 처음에 표시할 행 수
  infiniteInitialRowCount: 10,
  // 페이지 캐시 크기
  cacheBlockSize: 10,

  //paginateChildRows: true,
  rowSelection: 'multiple' /* 'single' or 'multiple',*/,
  rowBuffer: 0,
  // dataset 끝에 추가할 빈 row 수 : default 1
  cacheOverflowSize: 2,
  // 한번에 서버에 요청할 request 수
  maxConcurrentDatasourceRequests: 1,
  // 캐시에 저장할 페이지 수
  maxBlocksInCache: 1,

  // pagination custom 사용 여부
  suppressPaginationPanel: false,
  // 페이지 변경시 그리드가 맨 위로 스크롤 하지 않도록 설정
  suppressScrollOnNewData: true,

  paginationNumberFormatter: function (params) {
    //return '[' + params.value.toLocaleString() + ']';
    return ' ' + params.value.toLocaleString() + ' ';
  },
  ////////////////////////////////////////////////////////////////

  /* row style 지정 */
  //
  getRowStyle: (param: RowClassParams): RowStyle => {
    if (param.node.rowPinned) {
      return {'font-weight': 'bold', background: '#dddddd'};
    }
    return {textAlign: 'center'};
  },

  getRowHeight: function (param) {
    if (param.node.rowPinned) {
      return 22;
    }
    return 27;
  },
  // GRID READY 이벤트, 사이즈 자동조정
  onGridReady: function (event) {
    event.api.sizeColumnsToFit();
  },
  // 창 크기 변경 되었을 때 이벤트
  onGridSizeChanged: function (event) {
    event.api.sizeColumnsToFit();
  },

  onRowEditingStarted: function (event) {
    console.log('==> onRowEditingStarted');
  },

  onRowEditingStopped: function (event) {
    console.log('<== onRowEditingStopped');
  },

  // cell 편집 시작(셀클릭)시 발생
  onCellEditingStarted: function (event) {
    console.log('==> onCellEditingStarted');
  },

  // cell 편집 종료(셀이동)시 발생
  onCellEditingStopped: function (event) {
    console.log('<== onCellEditingStopped');
  },

  onRowClicked: function (event) {
    console.log('==> onRowClicked <==');
  },
  onCellClicked: function (event) {
    console.log('==> onCellClicked <==');
  },

  // 특정 조건에 따른 row 선택 필요시 사용
  isRowSelectable: function (event) {
    console.log('isRowSelectable');
    return true;
  },

  // row 선택이 바뀌는 경우 사용 : onRowClicked 이벤트와 유사
  onSelectionChanged: function (event) {
    console.log('onSelectionChanged');
  },

  // 정렬이 바뀐 경우 발생
  onSortChanged: function (event) {
    console.log('onSortChanged');
  },

  // 셀 값이 변경된 경우 발생
  onCellValueChanged: function (event) {
    console.log('onCellValueChanged');
  },

  // Get RowNodeId : top level에서 사용
  // ex) return data.id; ==> const rowNode = gridOptions.api.getRowNode(selectedRow.id)
  //getRowNodeId: useCallback((data) => {
  //  return data.id;
  //}, []),

  // // 그리드 Top에 데이타 고정
  // setPinnedTopRowData: (data) => {
  //   return null;
  // },
  //
  // // 그리드 Bottom에 데이타 고정
  // setPinnedBottomRowData: function (data) {
  //   return null;
  // },

  //components: {
  //    numericCellEditor: NumericCellEditor,
  //    moodEditor: MoodEditor
  //},

  debug: false
};
