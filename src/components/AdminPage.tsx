import React, { useState, useEffect } from 'react';
import { User, Users, Plus } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  role: string;
}

interface TeamData {
  id: string;
  name: string;
  members: string[];
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'user' });
  const [newTeam, setNewTeam] = useState({ name: '', members: [] });

  useEffect(() => {
    // In a real app, fetch users and teams from the backend
    setUsers([
      { id: '1', email: 'user1@example.com', role: 'admin' },
      { id: '2', email: 'user2@example.com', role: 'user' },
    ]);
    setTeams([
      { id: '1', name: 'Team A', members: ['user1@example.com'] },
      { id: '2', name: 'Team B', members: ['user2@example.com'] },
    ]);
  }, []);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send a request to create a new user
    console.log('Creating user:', newUser);
    setUsers([...users, { id: String(users.length + 1), ...newUser }]);
    setNewUser({ email: '', password: '', role: 'user' });
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send a request to create a new team
    console.log('Creating team:', newTeam);
    setTeams([...teams, { id: String(teams.length + 1), ...newTeam }]);
    setNewTeam({ name: '', members: [] });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <User className="mr-2" />
            Users
          </h2>
          <ul className="mb-4">
            {users.map(user => (
              <li key={user.id} className="mb-2">
                {user.email} - {user.role}
              </li>
            ))}
          </ul>
          <form onSubmit={handleCreateUser} className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser({...newUser, email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={e => setNewUser({...newUser, password: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={newUser.role}
              onChange={e => setNewUser({...newUser, role: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              <Plus className="inline mr-2" />
              Create User
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Users className="mr-2" />
            Teams
          </h2>
          <ul className="mb-4">
            {teams.map(team => (
              <li key={team.id} className="mb-2">
                {team.name} - {team.members.join(', ')}
              </li>
            ))}
          </ul>
          <form onSubmit={handleCreateTeam} className="space-y-2">
            <input
              type="text"
              placeholder="Team Name"
              value={newTeam.name}
              onChange={e => setNewTeam({...newTeam, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <select
              multiple
              value={newTeam.members}
              onChange={e => setNewTeam({...newTeam, members: Array.from(e.target.selectedOptions, option => option.value)})}
              className="w-full p-2 border rounded"
            >
              {users.map(user => (
                <option key={user.id} value={user.email}>
                  {user.email}
                </option>
              ))}
            </select>
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
              <Plus className="inline mr-2" />
              Create Team
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;