import * as React from 'react';
import { useEffect, useState } from 'react';

import FloatingActionButton from '../../components/floatingActionButton';
import Header from '../../components/header';

export default function Home() {
  return (
    <>
      <Header />
      <FloatingActionButton />
    </>
  );
}

//exemplo de como pegar token

// const token = localStorage.getItem('token');
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (token) {
//       const decodeToken = jwt_decode(token);
//       setUserData(decodeToken);
//     }
//   }, []);
