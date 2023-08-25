import React, { useState } from "react";
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

function UserTable({
  users,
  setUsers,
  selectedRows,
  toggleSelectRow,
  toggleSelectAllRows,
  currentPage,
  recordsPerPage,
}) {
  const [editRowId, setEditRowId] = useState({});

  const handleEditClick = (rowId) => {
    setEditRowId((prevState) => ({
      ...prevState,
      [rowId]: true,
    }));
  };

  const handleInputChanges = (e, rowId, field) => {
    const { value } = e.target;
    const updatedUser = users.map((user) => {
      if (user.id === rowId) {
        return { ...user, [field]: value };
      }
      return user;
    });
    setUsers(updatedUser);
  };

  const handleDeleteClick = (rowId) => {
    const updatedUsers = users.filter((user) => user.id !== rowId);
    setUsers(updatedUsers);
    setEditRowId((prevState) => {
      const { [rowId]: deleted, ...rest } = prevState;
      return rest;
    });
  };

  const handleSaveClick = (rowId) => {
    setEditRowId((prevState) => ({
      ...prevState,
      [rowId]: false,
    }));
  };

  const handleSelectAllRow = () => {
    const rowIdsOnPage = users
      .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
      .map((user) => user.id);

    toggleSelectAllRows(rowIdsOnPage);
  };

  return (
    <Grid container spacing={1}>
      <Table>
        <TableHead>
          <TableRow className="table-header-row">
            <TableCell>
              <Checkbox
                checked={selectedRows.length === recordsPerPage}
                onChange={handleSelectAllRow}
              />
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>NAME</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>EMAIL</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>ROLE</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {users.map((user) => (
            <TableRow
              key={user.id}
              className={selectedRows.includes(user.id) ? "selected-row" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(user.id)}
                  onChange={() => toggleSelectRow(user.id)}
                />
              </TableCell>
              <TableCell>
                <Grid container alignItems="center">
                  <Grid item>
                    {editRowId[user.id] ? (
                      <TextField
                        value={user.name}
                        onChange={(e) => handleInputChanges(e, user.id, "name")}
                      />
                    ) : (
                      <div>{user.name}</div>
                    )}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container alignItems="center">
                  <Grid item>
                    {editRowId[user.id] ? (
                      <TextField
                        value={user.email}
                        onChange={(e) =>
                          handleInputChanges(e, user.id, "email")
                        }
                      />
                    ) : (
                      <div>{user.email}</div>
                    )}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container alignItems="center">
                  <Grid item>
                    {editRowId[user.id] ? (
                      <TextField
                        value={user.role}
                        onChange={(e) => handleInputChanges(e, user.id, "role")}
                      />
                    ) : (
                      <div>{user.role}</div>
                    )}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                {editRowId[user.id] ? (
                  <IconButton onClick={() => handleSaveClick(user.id)}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleEditClick(user.id)}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => handleDeleteClick(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
}

export default UserTable;
