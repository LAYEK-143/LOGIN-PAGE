import { useRouter } from 'next/router';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBackspace } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css';

export default function Locker({ adminPassword }) {
  const [input, setInput] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const handleButtonClick = (value) => {
    if (value === 'ENTER') {
      if (input === adminPassword) {
        alert(`Login successful for ${id}!`);
      } else {
        alert('Invalid password');
      }
      setInput('');
    } else if (value === 'BACKSPACE') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  const keyboardLayout = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    'ENTER', 'BACKSPACE'
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Digital Locker Login for {id}
        </h1>

        <div className={styles.locker}>
          <input type="password" value={input} readOnly className={styles.inputField} />
          <div className={styles.keyboard}>
            {keyboardLayout.map((key) => (
              <button
                key={key}
                onClick={() => handleButtonClick(key)}
                className={styles.keyButton}
              >
                {key === 'ENTER' ? <FontAwesomeIcon icon={faArrowRight} /> :
                 key === 'BACKSPACE' ? <FontAwesomeIcon icon={faBackspace} /> : key}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  // Example paths, replace with your own logic
  const paths = [{ params: { id: 'example' } }];
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps() {
  return {
    props: {
      adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    }
  };
}
