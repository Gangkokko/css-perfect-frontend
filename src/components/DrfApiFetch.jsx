import { useEffect, useState } from 'react';
import client from '../lib/api/client';

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState({ id: '', content: '' });

  useEffect(() => {
    client.get('/categories').then((res) => {
      setTasks(res.data);
    });
  }, []);

  const newTask = () => {
    const data = {
      category: editedTask,
    };
    client
      .post('/categories', data)
      .then((res) => setTasks([...tasks, res.data.data]))
      .catch((err) => alert('エラーが発生しました。ページをリロードして、もう一度トライしてください。'));
  };

  const handleInputChange = () => (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };
  return (
    <div>
      <ul>
        {tasks.map((data) => (
          <li key={data.id}>
            {data.id} {data.content}
          </li>
        ))}
      </ul>
      <input type='text' name='content' value={editedTask.content} onChange={handleInputChange()} placeholder='New Task' required />
      <button onClick={() => newTask(editedTask)}>Create</button>
      <button onClick={newTask}>Create Post</button>
    </div>
  );
};

export default DrfApiFetch;
