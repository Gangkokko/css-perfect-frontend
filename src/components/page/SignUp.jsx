import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../lib/api/auth';
import { AuthContext } from '../../App';
import { Button } from 'nes-react';

export const SignUp = () => {
  const navigation = useNavigate();

  const { isSignedIn, loading, setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  if (!loading) {
    if (isSignedIn) {
      navigation('/');
    } else {
    }
  } else {
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(data);
      console.log(res);

      if (res.status === 200) {
        // アカウント作成と同時にサインインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigation('/');

        console.log('Signed in successfully!');
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='mt-8'>
      <form className='w-10/12 mx-auto md:max-w-md'>
        <div className='mb-8'>
          <label className='text-sm block' htmlFor='name'>
            名前
          </label>
          <input type='text' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} className='w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50' placeholder='名前' required />
        </div>
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
        <div className='mb-8'>
          <label htmlFor='password_confirmation' className='text-sm block'>
            パスワード確認
          </label>
          <input type='password' id='password_confirmation' name='password_confirmation' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className='w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50' placeholder='パスワード' required />
        </div>
        <Button success type='submit' onClick={(e) => handleSubmit(e)}>
          登録
        </Button>
        <div className='text-right'>
          <Link to='/login'>サインインへ</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
