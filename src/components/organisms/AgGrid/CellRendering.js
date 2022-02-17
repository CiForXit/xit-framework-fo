import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {render} from 'react-dom';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const MoodRenderer = forwardRef((props, ref) => {
  const imageForMood = (mood) =>
    'https://www.ag-grid.com/example-assets/smileys/' + (mood === 'Happy' ? 'happy.png' : 'sad.png');

  const [mood, setMood] = useState(imageForMood(props.value));

  useImperativeHandle(ref, () => {
    return {
      refresh(params) {
        setMood(imageForMood(params.value));
      }
    };
  });

  return <img width="20px" src={mood} alt="" />;
});

const GenderRenderer = (props) => {
  const image = props.value === 'Male' ? 'male.png' : 'female.png';
  const imageSource = `https://www.ag-grid.com/example-assets/genders/${image}`;
  return (
    <span>
      <img src={imageSource} alt="" />
      {props.value}
    </span>
  );
};
const AgeRenderer = (props) => {
  const age = props.value > 19 ? 'adult🍕' : 'child🍗';
  return <span>{age}</span>;
};

const MyRenderer = (props) => {
  return <span>{props.value} 입니다.</span>;
};

const CellRendering = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <div style={{width: '100%', height: '500px'}}>
      <h2>cell render</h2>
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%'
        }}
        className="ag-theme-alpine">
        <AgGridReact
          rowData={[
            {
              value: 14,
              type: 'age'
            },
            {
              value: 'female',
              type: 'gender'
            },
            {
              value: 'Happy',
              type: 'mood'
            },
            {
              value: 21,
              type: 'age'
            },
            {
              value: 'male',
              type: 'gender'
            },
            {
              value: 'Sad',
              type: 'mood'
            }
          ]}
          defaultColDef={{flex: 1}}
          frameworkComponents={{
            genderCellRenderer: GenderRenderer,
            moodCellRenderer: MoodRenderer,
            myCellRenderer: MyRenderer,
            ageCellRenderer: AgeRenderer
          }}
          // onGridReady={onGridReady}
        >
          <AgGridColumn field="value" />
          <AgGridColumn
            headerName="Rendered Value"
            field="value"
            cellRendererSelector={(params) => {
              const moodDetails = {component: 'moodCellRenderer'};
              const genderDetails = {
                component: 'genderCellRenderer',
                params: {
                  values: ['Male', 'Female']
                }
              };
              if (params.data.type === 'gender') return genderDetails;
              else if (params.data.type === 'mood') return moodDetails;
              else return undefined;
            }}
          />
          <AgGridColumn field="type" />
          <AgGridColumn
            headerName="my render"
            field="value"
            cellRendererSelector={(params) => {
              const moodDetails = {component: 'myCellRenderer'};
              const genderDetails = {
                component: 'myCellRenderer',
                params: {
                  values: ['Male', 'Femail']
                }
              };
              const ageDetails = {
                component: 'ageCellRenderer'
              };
              if (params.data.type === 'gender') return genderDetails;
              else if (params.data.type === 'mood') return moodDetails;
              else if (params.data.type === 'age') return ageDetails;
              else return undefined;
            }}
          />
        </AgGridReact>
      </div>
    </div>
  );
};

export default CellRendering;
