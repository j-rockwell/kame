import styles from './Summary.module.scss';

export type SummaryProps = {}

export default function Summary({}: SummaryProps) {
  return (
    <div className={styles.summary}>
      <h1 className={styles.header}>Summary</h1>
    </div>
  );
}