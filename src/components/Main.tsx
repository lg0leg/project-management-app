import { FC } from 'react';
import { Board } from 'pages/Board';
import { Boards } from 'pages/Boards';
import { NotFound } from 'pages/NotFound';
import { Profile } from 'pages/Profile';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Welcome } from 'pages/Welcome';
import { Navigate, Route, Routes } from 'react-router-dom';

export const Main: FC = () => {
  return (
    <main>
      <Routes>
        <Route index path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/registration" element={<SignUp />} />
        <Route path="/" element={<Boards />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </main>
  );
};
