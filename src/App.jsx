import { useState, useEffect } from 'react';
import { dengarSesi } from './lib/auth';
import Login from './components/Login';
import Meja from './components/Meja';

export default function App() {
  const [sesi, setSesi] = useState(null);
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    const berhenti = dengarSesi((sesiSekarang) => {
      setSesi(sesiSekarang);
      setMemuat(false);
    });

    return berhenti;
  }, []);

  if (memuat) {
    return null;
  }

  return sesi ? <Meja sesi={sesi} /> : <Login />;
}
