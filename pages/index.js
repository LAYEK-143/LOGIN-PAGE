import Head from 'next/head';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBackspace } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'ENTER') {
      if (input === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        alert('Login successful!');
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
      <Head>
        <title>Digital Locker Login</title>
        <meta name="description" content="A digital locker style login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Digital Locker Login
        </h1>

        <div className={styles.locker}>
          <motion.input
            type="password"
            value={input}
            readOnly
            className={styles.inputField}
            initial={{ scale: 1 }}
            animate={{ scale: input ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <div className={styles.keyboard}>
            {keyboardLayout.map((key) => (
              <motion.button
                key={key}
                onClick={() => handleButtonClick(key)}
                className={styles.keyButton}
                whileTap={{ scale: 0.9 }}
              >
                {key === 'ENTER' ? <FontAwesomeIcon icon={faArrowRight} /> :
                 key === 'BACKSPACE' ? <FontAwesomeIcon icon={faBackspace} /> : key}
              </motion.button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
