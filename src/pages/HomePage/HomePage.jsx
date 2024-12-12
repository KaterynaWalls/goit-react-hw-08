import DocumentTitle from '../../components/DocumentTitle/DocumentTitle';
import { Box, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <Box
        sx={{
          minHeight: 'calc(100vh - 50px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 500,
            fontSize: { xs: 32, sm: 48 },
            textAlign: 'center',
          }}
        >
          Welcome to PhoneBook{' '}
          <span role="img" aria-label="Greeting icon">
            💁‍♀️
          </span>
        </Typography>
      </Box>
    </>
  );
}
