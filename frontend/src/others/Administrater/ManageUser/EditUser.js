import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

const fetchUser = async (id) => {
  const response = await fetch(`http://localhost:8000/api/users/${id}/`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

export default function EditUser({ userId }) {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({ queryKey: ['user', userId], queryFn: () => fetchUser(userId) });

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const updateUser = useMutation({
    mutationFn: async (updatedUser) => {
      await fetch(`http://localhost:8000/api/users/${userId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['users'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser.mutate({ email, role });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
      <button type="submit">Update User</button>
    </form>
  );
}