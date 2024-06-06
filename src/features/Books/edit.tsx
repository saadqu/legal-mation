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
import { useParams } from 'react-router-dom';
import { useGetBookQuery, useUpdateBookMutation } from '../api/booksApiSlice';
import { useGetAuthorsQuery } from '../api/authorsApiSlice';

const EditBook: React.FC = () => {
  const { id } = useParams();
  const {
    data,
    isError,
    isFetching,
    refetch: bookRefetch,
  } = useGetBookQuery(id || 0);
  const {
    error: authorError,
    isError: isAuthorError,
    isFetching: isFetchingAuthor,
    refetch,
  } = useGetAuthorsQuery();
  const [updateBook, { isError: isErrorUpdating, isLoading }] =
    useUpdateBookMutation();
  const authors = useSelector((state: RootState) => state.authors.authors);
  const [authorList, setAuthorList] = useState<Author[]>([]);
  const defaultValues = {
    name: '',
    authors: 0,
    publishDate: new Date().toISOString().split('T')[0],
  };
  const { handleSubmit, control, setValue } = useForm<Book>({
    defaultValues,
  });

  useEffect(() => {
    if (!data) return;
    setValue('name', data.name);
    setValue('authors', Number(data.authorIds[0]));
    setValue('publishDate', data.publishDate);
  }, [data, setValue]);

  useEffect(() => {
    setAuthorList(authors);
  }, [authors]);

  useEffect(() => {
    refetch();
    bookRefetch();
  }, [refetch, bookRefetch]);

  const onSubmit = async (data: Book) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    try {
      if (!id) throw new Error('Id is missing');
      await updateBook({ book: data, id }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown) {
      console.log('🚀 ~ onSubmit ~ err:', err);
    }
  };

  return (
    <>
      <Grid item xs={8}>
        <Typography variant="h4">Edit Book id: {id}</Typography>
        {isLoading && <Alert severity="info">Updating Book...</Alert>}
        {isFetching && <Alert severity="info">Fetching Book...</Alert>}
        {isFetchingAuthor && <Alert severity="info">Fetching authors...</Alert>}
        {isAuthorError && (
          <Alert severity="error">
            Error: {JSON.stringify(authorError) || 'Something happened'}
          </Alert>
        )}
        {isErrorUpdating && (
          <Alert severity="error">Error: Failed to update.</Alert>
        )}
        {isError && (
          <Alert severity="error">Error: Failed to fetch book.</Alert>
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
              Update
            </Button>
          </div>
        </form>
      </Grid>
    </>
  );
};

export { EditBook };
