import {useState} from "react";
import styles from './LoginForm.module.scss';
import Button from "@/components/button/Button";

type LoginFormProps = {}

export default function LoginForm({}: LoginFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>('Example error message');

  return (
    <div className={styles.loginContainer}>
      <img className={styles.logo} src={'logo-sideways-light.png'} alt={'kame logo'} />

      {error && (
        <div className={styles.errorBanner}>
          <p className={styles.errorBannerText}>{error}</p>
        </div>
      )}

      <div className={styles.loginForm}>
        <form className={styles.formContent}>
          <label className={styles.formEntry}>
            Email:
            <input className={styles.formInput} type={'email'} value={email} onChange={e => setEmail(e.target.value)} />
          </label>

          <label className={styles.formEntry}>
            Password:
            <input className={styles.formInput} type={'password'} value={password} onChange={e => setPassword(e.target.value)} />
          </label>
        </form>

        <div className={styles.formSubmitBtn}>
          <Button variant={'primary'} onPress={() => console.log(email + " " + password)}>Login</Button>
        </div>
      </div>
    </div>
  );
}