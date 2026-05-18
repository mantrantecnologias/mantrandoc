import React, { useState } from 'react';
import { User, Key } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authorizedUserName = 'admin';
  const authorizedPassword = 'senha456';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarUsuario()) {
      onLogin();
    } else {
      alert('Usuário inválido, tente novamente');
    }
  };
  function validarUsuario() {
    return (username === authorizedUserName && password === authorizedPassword);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black text-gray-900 mb-2">Documentação Técnica</h3>
          <p className="text-gray-500">Bem-vindo à Mantran</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-700 transition-colors">
              <User size={20} />
            </div>
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-red-700 focus:ring-4 focus:ring-red-100 transition-all outline-none"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-700 transition-colors">
              <Key size={20} />
            </div>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-red-700 focus:ring-4 focus:ring-red-100 transition-all outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-red-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200 hover:bg-red-800 hover:shadow-red-300 transform active:scale-[0.98] transition-all"
          >
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;