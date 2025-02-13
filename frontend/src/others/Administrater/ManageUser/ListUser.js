import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchUsers = async () => {
  const response = await fetch('http://localhost:8000/api/users/');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export default function ListUser({ onEdit, onAdd }) {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const deleteUser = useMutation({
    mutationFn: async (id) => {
      await fetch(`http://localhost:8000/api/users/${id}/`, { method: 'DELETE' });
    },
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <div>
      <h2>User List</h2>
      <button onClick={onAdd} style={{ marginBottom: '10px' }}>Add User</button>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} style={{ marginBottom: '8px' }}>
              <strong>{user.email}</strong> - <em>{user.role}</em>
              <button onClick={() => onEdit(user)} style={{ marginLeft: '10px' }}>
                Edit
              </button>
              <button
                onClick={() => deleteUser.mutate(user.id)}
                style={{ marginLeft: '5px', color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </ul>
    </div>
  );
}
