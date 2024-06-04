import { Alert, Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import ChallengeInput from '../../components/Form/Input';
import { Author } from '../../interface';
import { useState } from 'react';
import constants from '../../constants';
import { AuthorPics } from '../../interface';
import { addAuthor } from '../../services/authors';

const fetchPics = (): Promise<AuthorPics> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<AuthorPics>(async (resolve) => {
    try {
      const response = await fetch(constants.RANDOM_PICS);
      const data = await response.json();
      if (response.ok) {
        const {
          results: [{ picture }],
        } = data;
        resolve(picture);
      }
    } catch (error) {
      resolve({ large: '', medium: '', thumbnail: '' });
    }
  });
};

const AddAuthor: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit, control, reset } = useForm<Author>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: Author) => {
    try {
      setLoading(true);
      const picture = await fetchPics();
      const payload = { ...data, picture };
      await addAuthor(payload);
      reset();
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
        <Typography variant="h4">Add An Author</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <Alert severity="info">Adding...</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <ChallengeInput<Author>
            name="name"
            control={control}
            rules={{ required: true }}
            style={{ marginTop: '2em' }}
            label="Name"
            error="Name is required"
          />
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

export { AddAuthor };
