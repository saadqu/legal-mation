import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Author, Book } from '../../interface';
import ChallengeInput from '../../components/Form/Input';
import { RootState } from '../../app/store';
import { useAddBookMutation } from '../api/booksApiSlice';
import { useGetAuthorsQuery } from '../api/authorsApiSlice';

const AddBook: React.FC = () => {
  const [addBook, { isError, isLoading }] = useAddBookMutation();
  const {
    error: authorError,
    isError: isAuthorError,
    isFetching,
  } = useGetAuthorsQuery();
  const authors = useSelector((state: RootState) => state.authors.authors);
  const [authorList, setAuthorList] = useState<Author[]>([]);
  const defaultValues = {
    name: '',
    authors: 0,
    publishDate: new Date().toISOString().split('T')[0],
  };
  const { handleSubmit, control, reset } = useForm<Book>({
    defaultValues,
  });

  useEffect(() => {
    setAuthorList(authors);
  }, [authors]);

  const onSubmit = async (data: Book) => {
    try {
      await addBook(data).unwrap();
      reset(defaultValues);
    } catch (err: unknown) {
      console.log('🚀 ~ onSubmit ~ err:', err);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">Add A Book</Typography>
        {isError && <Alert severity="error">Failed to add book</Alert>}
        {isLoading && <Alert severity="info">Adding...</Alert>}
        {isFetching && <div>Fetching Authors</div>}
        {isAuthorError && (
          <Alert severity="error">
            Error: {JSON.stringify(authorError) || 'Something happened'}
          </Alert>
        )}
        <form style={{ marginTop: '2em' }} onSubmit={handleSubmit(onSubmit)}>
          <ChallengeInput<Book>
            name="name"
            style={{ marginRight: '1em' }}
            control={control}
            rules={{ required: true }}
            label="Name"
            error="Name is required"
          />
          <ChallengeInput<Book>
            name="publishDate"
            type="date"
            control={control}
            rules={{ required: true }}
            label="Publish Date"
            error="Publish Date is required"
          />
          <div>
            <Controller
              name="authors"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Author</InputLabel>
                  <Select
                    fullWidth
                    style={{ marginBottom: '1em' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={field.value}
                    label="Author"
                    onChange={(event) => field.onChange(event.target.value)}
                  >
                    {authorList.map((author) => (
                      <MenuItem key={author.id} value={author.id}>
                        {author.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </div>
          <div>
            <Button type="submit" disabled={isLoading} variant="outlined">
              Add
            </Button>
          </div>
        </form>
      </Grid>
    </>
  );
};

export { AddBook };
