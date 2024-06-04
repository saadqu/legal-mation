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
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import { RootState, AppDispatch } from '../../app/store';
import { setAuthors } from './authorSlice';
import { Author } from '../../interface';
import { deleteAuthor, fetchAuthors } from '../../services/authors';

const Authors: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authors = useSelector((state: RootState) => state.authors.authors);
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number>(0);

  useEffect(() => {
    setFetchEnabled(true);
  }, []);

  const { status, error, isLoading, isError } = useQuery(
    'authors',
    fetchAuthors,
    {
      enabled: fetchEnabled,
      onSuccess: (data: { authors: Author[] }) => {
        dispatch(setAuthors(data.authors));
        setFetchEnabled(false);
      },
    }
  );

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
      setFetchEnabled(true);
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
      renderCell: (params: GridRenderCellParams<Author>) => ImageRenderer(params),
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
        {isLoading && <Alert severity="info">Loading...</Alert>}
        {status === 'loading' && <div>Loading...</div>}
        {isError && (
          <Alert severity="info">
            Error: {JSON.stringify(error) || 'Something happened'}
          </Alert>
        )}
        {status === 'success' && (
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
        )}
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
