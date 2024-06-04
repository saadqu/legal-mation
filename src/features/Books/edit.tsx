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
import { fetchAuthors } from '../../services/authors';
import { setAuthors } from '../Authors/authorSlice';
import { getSingle, update } from '../../services/books';
import { useParams } from 'react-router-dom';

interface BookEdit extends Book {
  authorIds: string[];
}

const EditBook: React.FC = () => {
  const { id } = useParams();
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
  const { handleSubmit, control, setValue } = useForm<Book>({
    defaultValues,
  });

  useEffect(() => {
    setAuthorList(authors);
  }, [authors]);

  useEffect(() => {
    setFetchEnabled(true);
  }, []);

  const {
    status,
    error: bookError,
    isError,
    isLoading,
  } = useQuery('singleBook', () => getSingle(id || 0), {
    enabled: fetchEnabled,
    onSuccess: (data: BookEdit) => {
      if (!data) throw new Error('No data found.');
      setValue('name', data.name);
      setValue('authors', Number(data.authorIds[0]));
      setValue('publishDate', data.publishDate);
      setFetchEnabled(false);
    },
  });

  const {
    error: authorError,
    isError: isAuthorError,
    isLoading: isFetchingAuthor
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
      if (!id) throw new Error('Id is missing');
      await update(data, id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid item xs={8}>
        <Typography variant="h4">Edit Book id: </Typography>
        {loading && <Alert severity="info">Updating Book...</Alert>}
        {isLoading && <Alert severity="info">Fetching Book...</Alert>}
        {isFetchingAuthor && (
          <Alert severity="info">Fetching authors...</Alert>
        )}
        {isAuthorError && (
          <Alert severity="error">
            Error: {JSON.stringify(authorError) || 'Something happened'}
          </Alert>
        )}
        {error === 'error' && (
          <Alert severity="error">Error: {error || 'Something happened'}</Alert>
        )}
        {status === 'loading' && (
          <Alert severity="info">Fetching book...</Alert>
        )}
        {isError && (
          <Alert severity="error">
            Error: {JSON.stringify(bookError) || 'Something happened'}
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
              Update
            </Button>
          </div>
        </form>
      </Grid>
    </>
  );
};

export { EditBook };
