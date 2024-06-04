import { Alert, Button, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { editAuthor, fetchSingle } from '../../services/authors';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { Author } from '../../interface';
import ChallengeInput from '../../components/Form/Input';
import { useForm } from 'react-hook-form';

const EditAuthor: React.FC = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState<Author>({
    name: '',
  });
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, setValue } = useForm<Author>({
    defaultValues: {
      name: author.name,
    },
  });

  useEffect(() => {
    setFetchEnabled(true);
  }, []);

  const { error, isLoading, isError } = useQuery(
    'singleAuthor',
    () => fetchSingle(id || 0),
    {
      enabled: fetchEnabled,
      onSuccess: (data: { authors: Author }) => {
        if (!data) throw new Error('No data found.');
        const { authors } = data;
        setAuthor(authors);
        setValue('name', authors.name);
        setFetchEnabled(false);
      },
    }
  );

  const onSubmit = async (data: Author) => {
    try {
      if (!id) throw new Error('id is not available');
      setLoading(true);
      author.name = data.name;
      await editAuthor(author, id);
    } catch (err: unknown) {
      console.log('🚀 ~ onSubmit ~ err:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid item xs={8}>
        <img
          src={author.picture?.large}
          alt="Image"
          style={{ width: 150, height: 150 }}
        />
        <Typography variant="h5">Edit Author id: {id}</Typography>
        {isLoading && <Alert severity="info">Loading...</Alert>}
        {loading && <Alert severity="info">Updating...</Alert>}
        {isError && (
          <Alert severity="error">
            Error: {JSON.stringify(error) || 'Something happened'}
          </Alert>
        )}

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
              Update
            </Button>
          </div>
        </form>
      </Grid>
    </>
  );
};

export { EditAuthor };
