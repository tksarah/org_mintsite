import { NFTMetadata } from '../../../types';
import styles from '../../../app/page.module.css';

interface NFTGridProps {
  tokenIds: bigint[] | undefined;
  tokenMetadata: NFTMetadata[];
}

export function NFTGrid({ tokenIds, tokenMetadata }: NFTGridProps) {
  return (
    <div className={styles.nftGrid}>
      {tokenIds?.map((tokenId, index) => (
        <div key={tokenId} className={styles.nftCard}>
          <img
            src={tokenMetadata[index]?.image || '/placeholder.jpg'}
            alt={`NFT ${tokenId}`}
            className={styles.nftImage}
          />
          <div className={styles.nftName}>
            {tokenMetadata[index]?.name || `NFT #${tokenId.toString()}`}
          </div>
        </div>
      ))}
    </div>
  );
}