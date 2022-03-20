import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../../lib/api/client';
import { Button } from 'nes-react';

const Stage = () => {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    client.get('/stages').then((res) => {
      setStages(res.data.data);
    });
  }, []);
  return (
    <div className='bg-yellow-400 h-screen'>
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4 mx-auto px-5 mb-8'>
          {stages.map((data) => (
            <div className='hover:bg-gray-700 delay-50 duration-100 bg-gray-800 p-5 rounded-lg group' key={data.id}>
              <Link to='/problem'>
                <div className='h-80'>
                  <img src={data.image.url} className='w-full rounded shadow object-cover h-full' alt='ステージ画像' />
                </div>
                <h3 className='text-gray-200 font-bold mt-5'>{data.name}</h3>
                <p className='text-gray-400 font-light mt-2 text-xs'>{data.description}</p>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <Link to='/'>
            <Button primary>タイトルへ戻る</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Stage;
