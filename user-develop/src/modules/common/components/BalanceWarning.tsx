import styles from '../../../app/page.module.css';

interface BalanceWarningProps {
  faucetUrl: string;
}

export function BalanceWarning({ faucetUrl }: BalanceWarningProps) {
  return (
    <div className={styles.rowChecker}>
      <span className={styles.textError}>
        NFTをミントするのに十分なETH残高がありません
      </span>
      <a
        href={faucetUrl}
        target="_blank"
        rel="noreferrer"
        className={styles.txLink}
      >
        ETH Faucet
      </a>
    </div>
  );
}