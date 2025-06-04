import React from 'react';
import { Toaster } from 'react-hot-toast';

function Alert() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}

export default Alert;
