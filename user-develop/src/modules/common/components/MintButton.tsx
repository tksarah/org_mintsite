import styles from '../../../app/page.module.css';

interface MintButtonProps {
  isPending: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export function MintButton({ isPending, isDisabled, onClick }: MintButtonProps) {
  return (
    <button
      disabled={isDisabled}
      className={styles.buttonAction}
      onClick={onClick}
      type="button"
    >
      {isPending ? "Confirming..." : "NFTミント"}
    </button>
  );
}