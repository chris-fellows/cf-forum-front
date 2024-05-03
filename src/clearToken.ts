import { useState } from 'react';

export default function clearToken() {
  localStorage.removeItem('token');            
  return true;
}
