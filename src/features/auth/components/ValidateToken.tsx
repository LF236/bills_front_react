import { useParams } from 'react-router-dom';

export const ValidateToken = () => {
  const params = useParams<{ token: string }>();
  const { token } = params;
  return (
    <div>
      <h1>Validate Token</h1>
      <p>Token: {token}</p>
    </div>
  );
}