import styles from '../../../app/page.module.css';

interface NetworkWarningProps {
  onSwitch: () => void;
}

export function NetworkWarning({ onSwitch }: NetworkWarningProps) {
  return (
    <div className={styles.rowChecker}>
      <span className={styles.textError}>
        Please connect to Soneium Minato
      </span>
      <button
        className={styles.buttonSwitchChain}
        onClick={onSwitch}
      >
        Switch to Soneium Minato
      </button>
    </div>
  );
}