import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";

const StyledDataGrid: React.FC<{
  pageSize: number;
  onPageSizeChange: (e: any) => void;
  onPageChange: (e: any) => void;
  fetching: boolean;
  rowCount: number;
  rows: any;
  columns: any;
}> = ({
  pageSize,
  onPageChange,
  onPageSizeChange,
  fetching,
  rowCount,
  rows,
  columns,
}) => {
  return (
    <DataGrid
      sx={{ width: "100%" }}
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      onPageChange={onPageChange}
      rowsPerPageOptions={[10, 15, 20]}
      pagination
      loading={fetching}
      rowCount={rowCount}
      paginationMode="server"
      rows={rows}
      columns={columns}
      getRowId={(row) => row.no}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 1 },
          csvOptions: {
            includeHeaders: false,
            allColumns: true,
            utf8WithBom: true,
          },
          printOptions: {
            copyStyles: true,
            hideToolbar: true,
            hideFooter: true,
          },
        },
      }}
    />
  );
};

export default StyledDataGrid;
