import styles from './Button.module.scss';

type ButtonProps = {
  variant?: 'primary' | 'muted' | 'success' | 'warning' | 'error';
  onPress?: () => void;
  children: string;
}

export default function Button({variant, onPress, children}: ButtonProps) {
  let buttonVariant = styles.primary;

  if (variant) {
    switch (variant) {
      case 'muted': buttonVariant = styles.muted; break;
      case 'success': buttonVariant = styles.success; break;
      case 'warning': buttonVariant = styles.warning; break;
      case 'error': buttonVariant = styles.error; break;
    }
  }

  return <button className={styles.button + " " + buttonVariant} onClick={onPress}>{children}</button>
}