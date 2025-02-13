import React, { useState } from 'react';
import ListUser from './ListUser';
import AddUser from './AddUser';
import EditUser from './EditUser';

 function UserManagement() {
  const [view, setView] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setView('edit');
  };

  const handleAdd = () => {
    setView('add');
  };

  const handleBack = () => {
    setView('list');
    setSelectedUser(null);
  };

  return (
    <div className="user-management-container">
      <ListUser onEdit={handleEdit} onAdd={handleAdd} />
    <AddUser onBack={handleBack} />
      <EditUser user={selectedUser} onBack={handleBack} />
    </div>
  );
}
export default UserManagement