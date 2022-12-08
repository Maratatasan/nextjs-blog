import React, { useState } from "react";

import { AgGridReact } from "ag-grid-react";
import data from "../data.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import gridStyles from "../../styles/agGrid.module.css";

export default function AgGrid() {
  const [rowData] = useState(data.map((r, i) => ({...r, id: i})));
  const defaultHeaderStyles = [gridStyles.ariaOne];
  const [columnDefs] = useState([
    {
      field: "ACCOUNTS",
      flex: 4,
      headerClass: [gridStyles.leftMargin1, ...defaultHeaderStyles],
      cellRenderer: ({ value }) => (
        <strong className={gridStyles.leftMargin1}>{value}</strong>
      ),
    },
    { field: "PRODUCTS", headerClass: defaultHeaderStyles },
    {
      field: "STATUS",
      headerClass: defaultHeaderStyles,
      valueGetter: (props) => (props.data.PRODUCTS === null ? false : true),
      cellRenderer: Status,
    },
    {
      field: "icon",
      headerClass: defaultHeaderStyles,
      headerName: "",
      flex: 1,
      cellRenderer: Icon,
    },
  ]);

  const defaultColDef = {
    flex: 3,
  };
  return (
    <>
      <div className={gridStyles.page}>
        <div style={{background: 'white', height: '40px', width: '100%'}}></div>
        <div
          className={"ag-theme-alpine " + gridStyles["ag-theme-alpine"]}
          style={{ width: 1280 }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination
            animateRows
            paginationPageSize={15}
            domLayout={"autoHeight"}
            getRowId={({data})=>data.id}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
}

function Status({ data }) {


  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        className={gridStyles["status-circle"]}
        style={{
          backgroundColor: data.PRODUCTS ? "#69C687" : "#BD3E43",
        }}
      ></span>
      <span className="status-text"> {data.PRODUCTS ? "Active" : "Deactivated"}</span>
    </div>
  );
}

function Icon() {
  return (
    <div className={gridStyles.iconDiv}>
      <div className={gridStyles.iconStyle}>
        <FontAwesomeIcon
          style={{ color: "white", height: "12px" }}
          icon={faEllipsisVertical}
        />
      </div>
    </div>
  );
}
