import React from 'react';
import { DrawerProps } from 'antd/lib/drawer';
import styled from 'styled-components';
import { Drawer } from 'antd';
import { WalletType } from '../context/AppContext';
import WalletList from './WalletList';

interface WalletSelectProps {
  onWalletSelect: (wallet: WalletType) => void;
  onClose: () => void;
  show: boolean;
  wallets: WalletType[];
  text: string;
}

const XChangeDrawer: React.FC<DrawerProps> = styled(Drawer)`
  .ant-drawer-body {
    padding: 0 8px;
  }
`;

const WalletSelect: React.FC<WalletSelectProps> = ({
  onWalletSelect: onMakeWalletPrimary,
  onClose,
  wallets,
  show,
  text,
}) => {
  return (
    <XChangeDrawer
      title={text}
      height={300}
      placement="bottom"
      closable={false}
      onClose={onClose}
      visible={show}
    >
      <WalletList
        wallets={wallets || []}
        onMakeWalletPrimary={onMakeWalletPrimary}
      />
    </XChangeDrawer>
  );
};

export default WalletSelect;
