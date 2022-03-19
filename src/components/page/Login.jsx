import { Container, Button } from 'nes-react';

const Login = () => {
  return (
    <div>
      <Container title='Buttons'>
        <Button>Regular</Button>
        <Button primary>Primary</Button>
        <Button success>Success</Button>
        <Button warning>Warning</Button>
        <Button error>Error</Button>
        <Button disabled>Disabled</Button>
      </Container>
      Login
    </div>
  );
};

export default Login;
