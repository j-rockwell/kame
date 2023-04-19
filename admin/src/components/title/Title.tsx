import styles from './Title.module.scss';

type TitleProps = {
  children: string;
}

export default function Title({children}: TitleProps) {
  return <h1 className={styles.title}>{children}</h1>
}