import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const queryClient = useQueryClient();

  const addUser = useMutation({
    mutationFn: async (newUser) => {
      await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['users'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser.mutate({ email, password, role });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" required />
      <button type="submit">Add User</button>
    </form>
  );
}