import { Alert, Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import ChallengeInput from '../../components/Form/Input';
import { Author } from '../../interface';
import constants from '../../constants';
import { AuthorPics } from '../../interface';
import { useAddAuthorMutation } from '../api/authorsApiSlice';

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
  const [ addAuthor, { isError, isLoading } ] = useAddAuthorMutation();
  const { handleSubmit, control, reset } = useForm<Author>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: Author) => {
    try {
      const picture = await fetchPics();
      const payload = { ...data, picture };
      await addAuthor(payload).unwrap();
      reset();
    } catch (err: unknown) {
      console.log('🚀 ~ onSubmit ~ err:', err);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">Add An Author</Typography>
        {isError && <Alert severity="error">Failed to save</Alert>}
        {isLoading && <Alert severity="info">Adding...</Alert>}
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
            <Button type="submit" disabled={isLoading} variant="outlined">
              Add
            </Button>
          </div>
        </form>
      </Grid>
    </>
  );
};

export { AddAuthor };
