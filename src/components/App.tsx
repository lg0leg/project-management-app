import React, { useEffect } from 'react';
import { Main } from '../components/Main';
import Footer from './Footer';
import Header from './Header';
import io from 'socket.io-client';

const socket = io('https://final-task-backend-production-27b0.up.railway.app');

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket is connected');
    });

    socket.on('disconnect', () => {
      console.log('socket is disconnected');
    });

    socket.on('boards', (data) => {
      console.log('socket boards', data);
    });
    socket.on('columns', (data) => {
      console.log('socket columns', data);
    });
    socket.on('tasks', (data) => {
      console.log('socket tasks', data);
    });
    socket.on('users', (data) => {
      console.log('socket users', data);
    });
    socket.on('files', (data) => {
      console.log('socket files', data);
    });
    socket.on('points', (data) => {
      console.log('socket points', data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('boards');
      socket.off('columns');
      socket.off('tasks');
      socket.off('users');
      socket.off('files');
      socket.off('points');
    };
  }, []);
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
