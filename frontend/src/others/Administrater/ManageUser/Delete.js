import axios from 'axios';

const DeleteUser = ({ userId }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/users/${userId}/`)
      .then(() => alert('User deleted!'))
      .catch(error => console.error(error));
  };

  return <button onClick={handleDelete}>Delete User</button>;
};

export default DeleteUser;
