import { deployPresaleEscrow } from '../presale';

jest.mock('../../artifacts/contracts/PresaleEscrow.sol/PresaleEscrow.json', () => ({
  abi: [],
  bytecode: '0x',
}), { virtual: true });

const deployMock = jest.fn().mockResolvedValue({
  waitForDeployment: jest.fn(),
  target: '0xescrow',
});

jest.mock('ethers', () => ({
  ethers: {
    JsonRpcProvider: jest.fn(),
    Wallet: jest.fn(),
    ContractFactory: jest.fn().mockImplementation(() => ({ deploy: deployMock })),
  },
}), { virtual: true });

describe('deployPresaleEscrow', () => {
  beforeEach(() => deployMock.mockClear());

  it('deploys escrow contract', async () => {
    const address = await deployPresaleEscrow('url', 'pk');
    expect(deployMock).toHaveBeenCalled();
    expect(address).toBe('0xescrow');
  });
});
