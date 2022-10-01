import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  SelectChangeEvent,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import StyledButton from "../../components/form/StyledButton";
import StyledDesktopDatePicker from "../../components/form/StyledDesktopDate";
import StyledMultiSelectChip from "../../components/form/StyledMultiSelectChip";
import StyledSelect from "../../components/form/StyledSelect";
import StyledTextField from "../../components/form/StyledTextField";
import StyledConfirmDialog from "../../components/widgets/StyledConfirmDialog";
import StyledDataGrid from "../../components/widgets/StyledDataGrid";
import StyledDialog from "../../components/widgets/StyledDialog";
import StyledSnackbar from "../../components/widgets/StyledSnackbar";
import { axiosInstance } from "../../config/axios_instance";
import { useFormState } from "../../hooks/useFormState";
import { categories, MONTHS } from "../../models/app-data";
import { Customer } from "../../models/customer.model";
import { labelRecord } from "../../utils/labelRecords";
import "./customer-list.scss";

const VISIBLE_FIELDS = [
  "no",
  "name",
  "birthday",
  "gender",
  "address",
  "phoneNumber",
  "favoriteItems",
  "action",
];

const CustomerList = () => {
  const [customerForm, setCustomerForm] = useState<Customer>({
    customerId: "",
    name: "",
    birthday: {} as Date,
    gender: "MALE",
    address: "",
    phoneNumber: "",
    favoriteItems: [],
  });
  const [customerBirthday, setCustomerBithday] = useState<Dayjs | null>(
    dayjs("2000-01-01")
  );
  const [customerFormstate, setCustomerFormState, reset] =
    useFormState<Customer>(customerForm);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [fetching, setfetching] = useState(false);
  const [searchKeyword_month, setSearchKeyword_month] = useState("");
  const [searchKeyword_Category, setSearchKeyword_Category] = useState("");

  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [customerDialog, setCustomerDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const customersColumnsRef = useRef<GridColDef[]>();
  const fetchAllCustomersRef = useRef<() => Promise<void>>();

  customersColumnsRef.current = [
    { field: "no", headerName: "No", flex: 0.3, headerAlign: "left" },
    {
      field: "name",
      headerName: "Customer Name",
      flex: 1,
      headerAlign: "left",
    },
    {
      field: "birthday",
      headerName: "Birthday",
      flex: 0.6,
      headerAlign: "left",
      renderCell: (params: any) => {
        const date = params.row.birthday;
        return <div>{date ? new Date(date).toLocaleDateString() : "-"}</div>;
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.5,
      headerAlign: "left",
    },
    {
      field: "address",
      headerName: "Addresss",
      flex: 1,
      headerAlign: "left",
    },
    {
      field: "phoneNumber",
      headerName: "phoneNumber",
      flex: 0.8,
      headerAlign: "left",
    },
    {
      field: "favoriteItems",
      headerName: "Favorites",
      flex: 2,
      headerAlign: "left",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        const editCustomer = () => {
          setCustomerForm(params.row);
          setCustomerBithday(dayjs(params.row.birthday));
          setCustomerDialog(true);
        };

        const confirmDelete = () => {
          setCustomerForm(params.row);
          setConfirmDialog(true);
        };

        return (
          <div className="action">
            <button
              className="lightblueBadget"
              onClick={editCustomer}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>
            <button className="warnBadget" onClick={confirmDelete}>
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const columns: any = useMemo(
    () =>
      customersColumnsRef.current.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    []
  );

  useEffect(() => {
    try {
      fetchAllCustomersRef.current();
    } catch (error) {
      setSnackbarMessage("Something went wrong");
      setErrorSnackbar(true);
    }
  }, [page, pageSize, searchKeyword_month, searchKeyword_Category]);

  fetchAllCustomersRef.current = async () => {
    setfetching(true);

    let endpoint = "/customer?";
    if (searchKeyword_month) {
      endpoint += `month=${searchKeyword_month}&`;
    }
    if (searchKeyword_Category) {
      endpoint += `favoriteItem=${searchKeyword_Category}`;
    } else {
      endpoint += `pageSize=${pageSize}&page=${page}`;
    }

    const res = await axiosInstance.get(endpoint);
    setCustomers(labelRecord<Customer>(res.data.listResult));
    setTotalCustomers(res.data.countResult);
    setfetching(false);
  };

  const refreshCustomerList = () => {
    setPage(1);
    setPageSize(10);
    setSearchKeyword_Category("");
    setSearchKeyword_month("");
    fetchAllCustomersRef.current();
  };

  const formValidation = (e: any) => {
    if (!e.target.value) {
      setCustomerFormState((prev) => ({ ...prev, [e.target.name]: true }));
    } else
      setCustomerFormState((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const resetCustomerForm = () => {
    setCustomerForm({
      customerId: "",
      name: "",
      birthday: {} as Date,
      gender: "MALE",
      address: "",
      phoneNumber: "",
      favoriteItems: [],
    });
  };

  const onChange = (e: any) => {
    setCustomerForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    formValidation(e);
  };

  const handleFavoriteItemsChange = (
    event: SelectChangeEvent<typeof categories>
  ) => {
    const {
      target: { value },
    } = event;
    setCustomerForm({
      ...customerForm,
      favoriteItems: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleCloseDialog = () => {
    setCustomerDialog(false);
    reset(customerForm);
    resetCustomerForm();
  };

  const saveCustomer = async () => {
    let isValid = true;

    Object.entries(customerForm).forEach(([key, value]) => {
      if (!value && key !== "customerId") {
        setCustomerFormState((prev) => ({ ...prev, [key]: true }));
        isValid = false;
      }
    });

    if (!customerForm.favoriteItems.length) {
      isValid = false;
      setSnackbarMessage("Add Favorite Items.");
      setErrorSnackbar(true);
    }

    if (isValid) {
      try {
        if (!customerForm.customerId) {
          const res = await axiosInstance.post(`/customer`, {
            ...customerForm,
            birthday: customerBirthday.toDate(),
          });

          if (res.data) {
            setSnackbarMessage("Successfully saved");
            setSuccessSnackbar(true);
            handleCloseDialog();
            refreshCustomerList();
          }
        } else {
          const res = await axiosInstance.patch(
            `/customer/${customerForm.customerId}`,
            {
              ...customerForm,
              birthday: customerBirthday.toDate(),
            }
          );

          if (res.data) {
            setSnackbarMessage("Successfully updated");
            setSuccessSnackbar(true);
            handleCloseDialog();
            refreshCustomerList();
          }
        }
      } catch (error) {
        setSnackbarMessage("Something went wrong");
        setErrorSnackbar(true);
      }
    }
  };

  const addNew = () => {
    setCustomerDialog(true);
    setCustomerBithday(dayjs("2000-01-01"));
    resetCustomerForm();
  };

  const deleteCustomer = async (customer: Customer) => {
    try {
      const res = await axiosInstance.delete(
        `/customer/${customer.customerId}`
      );

      if (res.data) {
        setConfirmDialog(false);
        setSnackbarMessage("Successfully deleted");
        setSuccessSnackbar(true);
        refreshCustomerList();
      }
    } catch (error) {
      setSnackbarMessage("This Customer can't be deleted");
      setErrorSnackbar(true);
    }
  };

  return (
    <div className="customerList">
      <div className="customerListHeader">
        <div className="customerListHeaderLeft">
          <label>Filter by birth month</label>
          <StyledSelect
            name="searchKeyword_month"
            labelId="monthId"
            label="Month"
            value={searchKeyword_month}
            onChange={(e: any) => setSearchKeyword_month(e.target.value)}
          >
            {MONTHS.map((month, idx) => (
              <MenuItem key={idx} value={idx + 1}>
                {month}
              </MenuItem>
            ))}
          </StyledSelect>
          <StyledSelect
            name="searchKeyword_category"
            labelId="categoryId"
            label="Category"
            value={searchKeyword_Category}
            onChange={(e: any) => setSearchKeyword_Category(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <MenuItem key={idx} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </StyledSelect>
          <StyledButton onClick={refreshCustomerList}>Show All</StyledButton>
        </div>
        <StyledButton type="contained" onClick={addNew}>
          <AddIcon /> Add New
        </StyledButton>
      </div>
      <div className="tableWrapper">
        {customers && (
          <StyledDataGrid
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage + 1)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            fetching={fetching}
            rowCount={totalCustomers}
            rows={customers}
            columns={columns}
          />
        )}
      </div>
      {/* Dialogs */}
      <StyledDialog
        dialogTitle={`${customerForm.customerId ? "Edit" : "Save"}  Customer`}
        open={customerDialog}
        close={handleCloseDialog}
        actionButtonText={`${customerForm.customerId ? "Update" : "Save"}`}
        submit={saveCustomer}
      >
        <StyledTextField
          name="name"
          type="text"
          label="Customer Name"
          variant="standard"
          errorMessage="Enter customer name"
          hasError={customerFormstate.name}
          validation={formValidation}
          onChange={onChange}
          value={customerForm.name}
        />
        <StyledTextField
          name="phoneNumber"
          type="text"
          label="Phone Number"
          variant="standard"
          errorMessage="Enter phone number"
          hasError={customerFormstate.phoneNumber}
          validation={formValidation}
          onChange={onChange}
          value={customerForm.phoneNumber}
        />
        <div style={{ width: "100%" }}>
          <label>Birthday</label>
          <StyledDesktopDatePicker
            name="birthday"
            validation={formValidation}
            value={customerBirthday}
            hasError={customerFormstate.birthday}
            errorMessage="Choose customer birthday"
            onChange={(newValue) => setCustomerBithday(newValue)}
          />
        </div>

        <StyledTextField
          name="address"
          type="text"
          label="Address"
          variant="outlined"
          errorMessage="Enter Address"
          hasError={customerFormstate.address}
          validation={formValidation}
          onChange={onChange}
          value={customerForm.address}
          row={2}
        />
        <div className="gender">
          <RadioGroup
            value={customerForm.gender}
            row
            onChange={onChange}
            name="gender"
          >
            <FormControlLabel value="MALE" control={<Radio />} label="MALE" />
            <FormControlLabel
              value="FEMALE"
              control={<Radio />}
              label="FEMALE"
            />
          </RadioGroup>
        </div>
        <StyledMultiSelectChip
          value={customerForm.favoriteItems}
          onChange={handleFavoriteItemsChange}
          items={categories}
        />
      </StyledDialog>
      <StyledConfirmDialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        message={`Are you sure want to delete ${customerForm?.name}?`}
      >
        <Button onClick={() => deleteCustomer(customerForm)} autoFocus>
          Agree
        </Button>
      </StyledConfirmDialog>
      {/* Snackbars */}
      <StyledSnackbar
        open={successSnackbar}
        onClose={() => setSuccessSnackbar(false)}
        message={snackbarMessage}
        severity="success"
      />
      <StyledSnackbar
        open={errorSnackbar}
        onClose={() => setErrorSnackbar(false)}
        message={snackbarMessage}
        severity="error"
      />
    </div>
  );
};

export default CustomerList;
