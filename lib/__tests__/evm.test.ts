import { deployEvmToken } from '../evm';

jest.mock('../../artifacts/contracts/Token.sol/Token.json', () => ({
  abi: [],
  bytecode: '0x',
}), { virtual: true });

const startPresaleMock = jest.fn().mockResolvedValue({ wait: jest.fn() });
const deployMock = jest.fn().mockResolvedValue({
  waitForDeployment: jest.fn(),
  startPresale: startPresaleMock,
  target: '0xtoken',
});

jest.mock('ethers', () => ({
  ethers: {
    JsonRpcProvider: jest.fn(),
    Wallet: jest.fn().mockImplementation(() => ({ address: '0xwallet' })),
    ContractFactory: jest.fn().mockImplementation(() => ({ deploy: deployMock })),
    ZeroAddress: '0x0000000000000000000000000000000000000000',
  },
}), { virtual: true });

describe('deployEvmToken', () => {
  beforeEach(() => {
    startPresaleMock.mockClear();
    deployMock.mockClear();
  });

  it('deploys token without presale', async () => {
    const address = await deployEvmToken('url', 'pk', 'A', 'A', 18, 1000n);
    expect(deployMock).toHaveBeenCalledWith('A', 'A', 18, 1000n, 0, 0, '0x0000000000000000000000000000000000000000');
    expect(startPresaleMock).not.toHaveBeenCalled();
    expect(address).toBe('0xtoken');
  });

  it('starts presale when duration provided', async () => {
    const address = await deployEvmToken('url', 'pk', 'B', 'B', 18, 1000n, 0n, 0n, null, 10n);
    expect(startPresaleMock).toHaveBeenCalledWith(10n);
    expect(address).toBe('0xtoken');
  });
});
