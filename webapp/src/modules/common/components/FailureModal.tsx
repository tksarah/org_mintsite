import styles from '../../../app/page.module.css';

interface FailureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FailureModal({ isOpen, onClose }: FailureModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        <div className={styles.failureIcon}>!</div>
        <h2>Failed</h2>
        <p>Unfortunately, your transaction was unsuccessful. Please try again.</p>
      </div>
    </div>
  );
} 