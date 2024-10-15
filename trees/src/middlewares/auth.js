import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function authMiddleware(handler) {
  return async (req) => {
    try {
      const token = req.headers.get('Authorization')?.split(' ')[1];
      if (!token) {
        return NextResponse.json({ message: "Authentication required" }, { status: 401 });
      }
      const sec = '6b3a55e0261b034c70e5b16d8a572550e05c8c209e3a3c25d5a5db75d2bb2b4'|| process.env.JWT_SECRET;
      const decoded = jwt.verify(token, sec);
      req.userId = decoded.userId;

      return handler(req);
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  };
}

export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

export const isAuthenticated = () => {
  return !!getToken();
};