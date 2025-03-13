import styles from '../../../app/page.module.css';

interface LoadingModalProps {
  isOpen: boolean;
}

export function LoadingModal({ isOpen }: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>リクエストを処理中</h2>
        <div className={styles.spinner}></div>
        <p>リクエストを処理しています。処理が終了するまでブラウザを閉じないでください。そうしないと、資産を失う可能性があります。</p>
      </div>
    </div>
  );
} 