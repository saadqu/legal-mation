import { Alert, Button, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Author } from '../../interface';
import ChallengeInput from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import {
  useGetAuthorQuery,
  useUpdateAuthorMutation,
} from '../api/authorsApiSlice';

const EditAuthor: React.FC = () => {
  const { id } = useParams();
  const { data, isError, isFetching } = useGetAuthorQuery(id || 0);
  const [updateAuthor, { isError: isErrorUpdating, isLoading }] =
    useUpdateAuthorMutation();

  const { handleSubmit, control, setValue } = useForm<Author>({
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (!data) return;
    setValue('name', data.authors.name);
  }, [data, setValue]);

  const onSubmit = async (author: Author) => {
    try {
      if (!id) throw new Error('id is not available');
      if (!data) throw new Error('Author values not found.');
      const authorPayload = { ...data.authors, name: author.name };
      // data.authors.name = author.name;
      await updateAuthor({ author: authorPayload, id }).unwrap();
    } catch (err: unknown) {
      console.log('🚀 ~ onSubmit ~ err:', err);
    }
  };

  return (
    <>
      <Grid item xs={8}>
        <img
          src={data?.authors.picture?.large}
          alt="Image"
          style={{ width: 150, height: 150 }}
        />
        <Typography variant="h5">Edit Author id: {id}</Typography>
        {isFetching && <Alert severity="info">Loading...</Alert>}
        {isLoading && <Alert severity="info">Updating...</Alert>}
        {isError && <Alert severity="error">Error: Fetching failed.</Alert>}
        {isErrorUpdating && (
          <Alert severity="error">Error: Updating failed.</Alert>
        )}

        {data && (
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
                Update
              </Button>
            </div>
          </form>
        )}
      </Grid>
    </>
  );
};

export { EditAuthor };
