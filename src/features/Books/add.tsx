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
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { Author, Book } from '../../interface';
import ChallengeInput from '../../components/Form/Input';
import { AppDispatch, RootState } from '../../app/store';
import { addBook } from '../../services/books';
import { fetchAuthors } from '../../services/authors';
import { setAuthors } from '../Authors/authorSlice';

const AddBook: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchEnabled, setFetchEnabled] = useState(false);
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

  useEffect(() => {
    setFetchEnabled(true);
  }, []);

  const {
    status: authorStatus,
    error: authorError,
    isError: isAuthorError,
  } = useQuery('authors', fetchAuthors, {
    enabled: fetchEnabled,
    onSuccess: (data: { authors: Author[] }) => {
      dispatch(setAuthors(data.authors));
      setFetchEnabled(false);
    },
  });

  const onSubmit = async (data: Book) => {
    try {
      setLoading(true);
      await addBook(data);
      reset(defaultValues);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log('🚀 ~ onSubmit ~ err:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">Add A Book</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <Alert severity="info">Adding...</Alert>}
        {authorStatus === 'loading' && <div>Fetching Authors</div>}
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
            <Button type="submit" disabled={loading} variant="outlined">
              Add
            </Button>
          </div>
        </form>
      </Grid>
    </>
  );
};

export { AddBook };
