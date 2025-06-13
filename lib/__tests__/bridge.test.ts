import { bridgeViaAxelar, bridgeViaLayerZero } from '../bridge';

const transferWait = jest.fn();
const transferMock = jest.fn().mockResolvedValue({ wait: transferWait });
const sendWait = jest.fn().mockResolvedValue({ hash: '0xhash' });
const sendFromMock = jest.fn().mockResolvedValue({ wait: sendWait });

jest.mock('@layerzerolabs/oft-evm/artifacts/contracts/oft/OFT.sol/OFT.json', () => ({
  abi: [],
}), { virtual: true });

jest.mock('@axelar-network/axelarjs-sdk', () => ({
  AxelarAssetTransfer: jest.fn().mockImplementation(() => ({
    getDepositAddress: jest.fn().mockResolvedValue('deposit'),
  })),
  Environment: { MAINNET: 'mainnet' },
}), { virtual: true });

jest.mock('ethers', () => ({
  ethers: {
    JsonRpcProvider: jest.fn(),
    Wallet: jest.fn().mockImplementation(() => ({ address: 'wallet' })),
    Contract: jest.fn().mockImplementation(() => ({ transfer: transferMock, sendFrom: sendFromMock })),
    ZeroAddress: '0x0000000000000000000000000000000000000000',
    solidityPacked: jest.fn().mockReturnValue('packed'),
  },
}), { virtual: true });

describe('bridgeViaAxelar', () => {
  beforeEach(() => { transferMock.mockClear(); transferWait.mockClear(); });

  it('transfers tokens to deposit address', async () => {
    const addr = await bridgeViaAxelar({
      rpcUrl: 'url',
      privateKey: 'pk',
      fromChain: 'A',
      toChain: 'B',
      tokenAddress: 'token',
      amount: 1n,
      destinationAddress: 'dest',
    });
    expect(transferMock).toHaveBeenCalledWith('deposit', 1n);
    expect(addr).toBe('deposit');
  });
});

describe('bridgeViaLayerZero', () => {
  beforeEach(() => { sendFromMock.mockClear(); sendWait.mockClear(); });

  it('calls sendFrom and returns hash', async () => {
    const hash = await bridgeViaLayerZero({
      rpcUrl: 'url',
      privateKey: 'pk',
      oftAddress: 'oft',
      dstChainId: 2,
      amount: 5n,
      destinationAddress: 'dest',
    });
    expect(sendFromMock).toHaveBeenCalledWith(
      'wallet',
      2,
      'packed',
      5n,
      'wallet',
      '0x0000000000000000000000000000000000000000',
      '0x'
    );
    expect(hash).toBe('0xhash');
  });
});
