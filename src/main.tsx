import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Motivation from './pages/Motivation';
import ErrorPage from './pages/ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume/:company" element={<Resume />} />
            <Route path="/motivation/:company" element={<Motivation />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="*" element={<ErrorPage code={404} />} />
        </Routes>
    </BrowserRouter>,
);