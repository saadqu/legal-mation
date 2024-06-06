import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import { RootState } from '../../app/store';
import { Author } from '../../interface';
import { deleteAuthor } from '../../services/authors';
import { useGetAuthorsQuery } from '../api/authorsApiSlice';

const Authors: React.FC = () => {
  const navigate = useNavigate();
  const { error, isError, isFetching, refetch } = useGetAuthorsQuery();
  const authors = useSelector((state: RootState) => state.authors.authors);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number>(0);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const editAuthor = (id: string | number): void => {
    navigate(`/edit-author/${id}`);
  };

  const deleteAuthorRow = (id: string | number): void => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const deleteAuthorFromDialog = async (): Promise<void> => {
    try {
      await deleteAuthor(selectedId);
    } catch (error: unknown) {
      console.log('🚀 ~ deleteAuthorFromDialog ~ error:', error);
    } finally {
      setOpenDeleteDialog(false);
      refetch();
    }
  };

  const ImageRenderer = (props: GridRenderCellParams<Author>) => {
    return (
      <img
        src={props.value.large}
        alt="Image"
        style={{ width: 50, height: 50, objectFit: 'cover' }}
      />
    );
  };

  const columns: GridColDef<Author>[] = [
    {
      field: 'picture',
      headerName: 'Image',
      width: 150,
      renderCell: (params: GridRenderCellParams<Author>) =>
        ImageRenderer(params),
    },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            showInMenu={false}
            label="Edit"
            className="textPrimary"
            onClick={() => editAuthor(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            showInMenu={false}
            label="Delete"
            onClick={() => deleteAuthorRow(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Grid item xs={8}>
        <Typography variant="h4">Authors</Typography>
        <div>
          <Button variant="outlined" onClick={() => navigate('/add-author')}>
            Add
          </Button>
        </div>
        {isFetching && <Alert severity="info">Loading...</Alert>}
        {isError && (
          <Alert severity="info">
            Error: {JSON.stringify(error) || 'Something happened'}
          </Alert>
        )}
        <Box width={700}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={authors}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </Box>
      </Grid>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete id: {selectedId}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Disagree</Button>
          <Button onClick={() => deleteAuthorFromDialog()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { Authors };
