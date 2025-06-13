import { deployLiquidityLock } from '../liquidity-lock';

jest.mock('../../artifacts/contracts/LiquidityLock.sol/LiquidityLock.json', () => ({
  abi: [],
  bytecode: '0x',
}), { virtual: true });

const deployMock = jest.fn().mockResolvedValue({
  waitForDeployment: jest.fn(),
  target: '0xlock',
});

jest.mock('ethers', () => ({
  ethers: {
    JsonRpcProvider: jest.fn(),
    Wallet: jest.fn(),
    ContractFactory: jest.fn().mockImplementation(() => ({ deploy: deployMock })),
  },
}), { virtual: true });

describe('deployLiquidityLock', () => {
  beforeEach(() => deployMock.mockClear());

  it('deploys lock contract', async () => {
    const address = await deployLiquidityLock('url', 'pk', '0xtoken', 5n);
    expect(deployMock).toHaveBeenCalledWith('0xtoken', 5);
    expect(address).toBe('0xlock');
  });
});
