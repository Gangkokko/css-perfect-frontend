import Cookies from 'js-cookie';
import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from '../../lib/api/auth';
import { AuthContext } from '../../App';
import { Button } from 'nes-react';

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const router = useLocation();

  const handleSignOut = async () => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        setIsSignedIn(false);
        navigate.push('/');

        console.log('Succeeded in sign out');
      } else {
        console.log('Failed in sign out');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <Link to='/'>
            <Button error onClick={handleSignOut}>
              サインアウト
            </Button>
          </Link>
        );
      } else {
        if (router.pathname === '/login') {
          return (
            <Link to='/'>
              <Button primary onClick={handleSignOut}>
                タイトルへ戻る
              </Button>
            </Link>
          );
        } else {
          return (
            <Link to='/login'>
              <Button primary onClick={handleSignOut}>
                ログイン
              </Button>
            </Link>
          );
        }
      }
    } else {
      return <></>;
    }
  };

  return (
    <div className='bg-yellow-400 py-8'>
      <div className='container mx-auto text-right'>
        <AuthButtons />
      </div>
    </div>
  );
};

export default Header;
