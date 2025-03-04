"use client";
import { useEffect, useState } from "react";
import { type Address } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWalletClient,
} from "wagmi";
import { soneiumMinato } from "viem/chains";
import NFT_ABI from "../modules/wagmi/abi/DemoNFT";
import styles from "./page.module.css";
import { NFTGrid } from "../modules/common/components/NFTGrid";
import { MintButton } from "../modules/common/components/MintButton";
import { NetworkWarning } from "../modules/common/components/NetworkWarning";
import { BalanceWarning } from "../modules/common/components/BalanceWarning";
import { LoadingModal } from "../modules/common/components/LoadingModal";
import { SuccessModal } from "../modules/common/components/SuccessModal";
import { FailureModal } from "../modules/common/components/FailureModal";
import { NFTMetadata } from "../types";

// Todo: Update to the correct address for the deployed contract
const nftContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address;
const faucetDocs = "https://docs.soneium.org/docs/builders/tools/faucets";

export default function Home(): JSX.Element {
  const [txDetails, setTxDetails] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [latestNFT, setLatestNFT] = useState<{ name: string; image: string }>({ name: "", image: "" });
  const { address: walletAddress } = useAccount();

  const { switchChain } = useSwitchChain();
  const connectedId = useChainId();
  const chainId = soneiumMinato.id;
  const isConnectedToMinato = connectedId === soneiumMinato.id;

  const { data: walletClient } = useWalletClient({
    chainId,
    account: walletAddress,
  });

  const publicClient = usePublicClient({
    chainId,
  });

  const [isPending, setIsPending] = useState(false);
  const { data: bal } = useBalance({
    address: walletAddress,
    chainId,
  });
  const isBalanceZero = bal?.value.toString() === "0";

  const { data, isFetched, refetch } = useReadContract({
    abi: NFT_ABI,
    address: nftContractAddress,
    functionName: "balanceOf",
    args: [walletAddress as Address],
  });

  const { data: tokenIds, isFetched: isTokenIdsFetched, refetch: refetchTokenIds } = useReadContract({
    abi: NFT_ABI,
    address: nftContractAddress,
    functionName: "getListTokenId",
    args: [walletAddress as Address],
  });

  const [tokenURIs, setTokenURIs] = useState<string[]>([]);
  const [tokenMetadata, setTokenMetadata] = useState<NFTMetadata[]>([]);

  useEffect(() => {
    async function fetchTokenURIs() {
      if (!tokenIds || !publicClient) return;
      
      try {
        const uris = await Promise.all(
          tokenIds.map(async (tokenId) => {
            const uri = await publicClient.readContract({
              address: nftContractAddress as Address,
              abi: NFT_ABI,
              functionName: 'tokenURI',
              args: [tokenId],
            });
            return uri;
          })
        );
        setTokenURIs(uris);
      } catch (error) {
        console.error('Error fetching token URIs:', error);
      }
    }

    fetchTokenURIs();
  }, [tokenIds, publicClient]);

  useEffect(() => {
    async function fetchTokenMetadata() {
      if (!tokenURIs.length) return;
      
      try {
        const metadata = await Promise.all(
          tokenURIs.map(async (uri) => {
            const response = await fetch(uri);
            const data = await response.json();
            return data as NFTMetadata;
          })
        );
        setTokenMetadata(metadata);
      } catch (error) {
        console.error('Error fetching token metadata:', error);
      }
    }

    fetchTokenMetadata();
  }, [tokenURIs]);

  async function mintNft(): Promise<void> {
    if (!walletClient || !publicClient || !walletAddress) return;
    try {
      setIsPending(true);
      setTxDetails("");
      setShowFailure(false);
      const tx = {
        account: walletAddress as Address,
        address: nftContractAddress as Address,
        abi: NFT_ABI,
        functionName: "safeMint",
        args: [walletAddress],
      } as const;
      const { request } = await publicClient.simulateContract(tx);
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({
        hash,
      });
      const txUrl = `https://explorer-testnet.soneium.org/tx/${hash}`;
      setTxDetails(txUrl);
      
      // Fetch the latest NFT metadata
      await refetch();
      await refetchTokenIds();
      const newTokenId = tokenIds?.[tokenIds.length - 1];
      if (newTokenId) {
        const uri = await publicClient.readContract({
          address: nftContractAddress as Address,
          abi: NFT_ABI,
          functionName: 'tokenURI',
          args: [newTokenId],
        });
        const response = await fetch(uri as string);
        const metadata = await response.json();
        setLatestNFT({
          name: metadata.name,
          image: metadata.image,
        });
      }
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      setShowFailure(true);
    } finally {
      setIsPending(false);
    }
  }

  function textNftBalances(bal: string): string {
    const balance = Number(bal);
    if (balance > 1) {
      return `あなた${balance}つのNFTを所有しています`;
    } else if (balance === 1) {
      return `あなた${balance}つのNFTを所有しています`;
    } else {
      return `NFTをまだ所有していません`;
    }
  }
  useEffect(() => {
    setTxDetails("");
  }, [walletAddress]);

  useEffect(() => {
    
  }, [tokenIds]);

  // Memo: display the page after fetching the NFT balance
  return !isFetched ? (
    <div className={styles.container}/>
  ) : (
    <div className={styles.container}>
      <LoadingModal isOpen={isPending} />
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        nftName={latestNFT.name}
        nftImage={latestNFT.image}
        txHash={txDetails}
      />
      <FailureModal
        isOpen={showFailure}
        onClose={() => setShowFailure(false)}
      />
      
      <div className={styles.rowBalance}>
        {walletAddress && (
          <>
            <span>{textNftBalances(data?.toString() || "0")}</span>
            {tokenIds?.length === Number(process.env.NEXT_PUBLIC_SPECIAL_LINK_NUM_NFT) && (
              <div className={styles.membershipLink}>
                参加証保有者特設リンクは<a href={process.env.NEXT_PUBLIC_SPECIAL_LINK} className={styles.specialLink}>こちら</a>
              </div>
            )}
          </>
        )}
      </div>
      <br />

      {!walletAddress && (
        <div className={styles.notConnectedLabel}>ウォレットに接続して、NFT を取得しよう</div>
      )}
      <MintButton 
          isPending={isPending}
        isDisabled={isPending || !walletAddress || isBalanceZero || !isConnectedToMinato}
          onClick={mintNft}
        />

      {walletAddress && isBalanceZero && (
        <BalanceWarning faucetUrl={faucetDocs} />
      )}

      {!isConnectedToMinato && walletAddress && (
        <NetworkWarning onSwitch={() => switchChain({ chainId })} />
      )}

      {!isTokenIdsFetched || tokenMetadata.length < (tokenIds?.length || 0) ? (
        <div className={styles.nftGrid}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={`${styles.nftCard} ${styles.skeleton}`}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonText} />
            </div>
          ))}
        </div>
      ) : (
        <NFTGrid tokenIds={tokenIds ? [...tokenIds] : undefined} tokenMetadata={tokenMetadata} />
      )}
    </div>
  );
}
