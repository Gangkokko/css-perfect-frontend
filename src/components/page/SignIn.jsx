import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../lib/api/auth';
import { AuthContext } from '../../App';
import { Button } from 'nes-react';

const SignIn = () => {
  const { isSignedIn, loading, setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  if (!loading) {
    if (isSignedIn) {
      navigate('/');
    } else {
    }
  } else {
  }

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className='mt-8'>
        <form className='w-10/12 mx-auto md:max-w-md'>
          <div className='mb-8'>
            <label className='text-sm block' htmlFor='email'>
              メールアドレス
            </label>
            <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50' placeholder='メールアドレス' required />
          </div>
          <div className='mb-8'>
            <label htmlFor='password' className='text-sm block'>
              パスワード
            </label>
            <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50' placeholder='パスワード' required />
          </div>
          <Button success type='submit' onClick={(e) => handleSignInSubmit(e)}>
            ログイン
          </Button>
          <div className='text-right'>
            <Link to='/register'>サインアップ</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
