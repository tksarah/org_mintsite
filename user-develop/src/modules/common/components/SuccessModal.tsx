import styles from '../../../app/page.module.css';
import { ExternalLink } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  nftName: string;
  nftImage: string;
  txHash: string;
}

export function SuccessModal({ isOpen, onClose, nftName, nftImage, txHash }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        <div className={styles.successIcon}>✓</div>
        <h2>ミントに成功しました</h2>
        
        <div className={styles.nftPreview}>
          <img src={nftImage || '/placeholder.jpg'} alt={nftName} />
        </div>
        
        <h3>{nftName}</h3>
        
        <a href={txHash} target="_blank" rel="noreferrer" className={styles.viewTransaction}>
          トランザクションを表示 <ExternalLink size={14} className={styles.externalIcon} />
        </a>
        
        <button onClick={onClose} className={styles.backButton}>
          トップに戻る
        </button>
      </div>
    </div>
  );
} 