import {
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
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { AppDispatch, RootState } from '../../app/store';
import { fetchBooks, removeBook } from '../../services/books';
import { setBooks } from './bookSlice';
import { Book } from '../../interface';

const BooksComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number>(0);

  useEffect(() => {
    setFetchEnabled(true);
  }, []);

  const { status, error, isError } = useQuery('books', fetchBooks, {
    enabled: fetchEnabled,
    onSuccess: (data: { books: Book[] }) => {
      console.log('🚀 ~ data:', data);
      dispatch(setBooks(data.books));
      setFetchEnabled(false);
    },
  });

  const editBook = (id: string | number) => {
    console.log('🚀 ~ id:', id);
    navigate(`/edit-book/${id}`);
  };

  const deleteBookRow = (id: string | number) => {
    console.log('🚀 ~ deleteAuthor ~ id:', id);
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const deleteBookFromDialog = async () => {
    console.log('🚀 ~ deleteAuthorFromDialog ~ id:', selectedId);
    try {
      await removeBook(selectedId);
    } catch (error) {
      console.log('🚀 ~ deleteAuthorFromDialog ~ error:', error);
    } finally {
      setOpenDeleteDialog(false);
      setFetchEnabled(true);
    }
  };

  const columns: GridColDef<Book>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'publishDate', headerName: 'Publish Date', width: 200 },
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
            onClick={() => editBook(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            showInMenu={false}
            label="Delete"
            onClick={() => deleteBookRow(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Grid item xs={8}>
        <Typography variant="h4">Books</Typography>
        <div>
          <Button variant="outlined" onClick={() => navigate('/add-book')}>
            Add
          </Button>
        </div>
        {status === 'loading' && <div>Loading...</div>}
        {isError && (
          <div>Error: {JSON.stringify(error) || 'Something happened'}</div>
        )}
        {status === 'success' && (
          <Box width={700}>
            <div style={{ height: 400, width: '100%' }}>
              {/* <DataGrid {...gridData} slots={{ toolbar: GridToolbar }} /> */}
              <DataGrid
                rows={books}
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
          <Button onClick={() => deleteBookFromDialog()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { BooksComponent };
