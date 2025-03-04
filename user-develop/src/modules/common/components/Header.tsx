"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./Header.module.css";
import { Wallet, ChevronDown } from "lucide-react";
export function Header(): JSX.Element {
  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>LOGO</div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          if (!mounted) {
            return (
              <div
                aria-hidden={true}
                style={{
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />
            );
          }

          if (!account) {
            return (
              <button 
                onClick={openConnectModal} 
                className="connect-button"
              >
                <Wallet size={16} />
                <span>ウォレット接続</span>
              </button>
            );
          }

          return (
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={openChainModal}
                className="chain-button"
              >
                {chain?.name}
                <ChevronDown size={16} />
              </button>

              <button
                onClick={openAccountModal}
                className="account-button"
              >
                <Wallet size={16} />
                {account.address.slice(0, 6)}...{account.address.slice(-4)}
              </button>
            </div>
          );
        }}
      </ConnectButton.Custom>
    </header>
  );
}