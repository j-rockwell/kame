import styles from './Summary.module.scss';
import Title from "@/components/title/Title";

export type SummaryProps = {}

export default function Summary({}: SummaryProps) {
  return (
    <div className={styles.summary}>
      <Title>Summary</Title>
    </div>
  );
}