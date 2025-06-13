import { distributeTokens } from '../token-distribution';

const waitMock = jest.fn();
const transferMock = jest.fn().mockResolvedValue({ wait: waitMock });
const decimalsMock = jest.fn().mockResolvedValue(6);

jest.mock('ethers', () => ({
  ethers: {
    JsonRpcProvider: jest.fn(),
    Wallet: jest.fn(),
    Contract: jest.fn().mockImplementation(() => ({
      decimals: decimalsMock,
      transfer: transferMock,
    })),
    parseUnits: jest.fn().mockImplementation((a, b) => `${a}-${b}`),
  },
}), { virtual: true });

describe('distributeTokens', () => {
  beforeEach(() => {
    waitMock.mockClear();
    transferMock.mockClear();
    decimalsMock.mockClear();
    process.env.AIRDROP_RPC_URL = 'url';
    process.env.EVM_PRIVATE_KEY = 'pk';
    process.env.AIRDROP_TOKEN_ADDRESS = 'token';
    process.env.AIRDROP_AMOUNT = '1';
  });

  it('throws when env is missing', async () => {
    delete process.env.AIRDROP_RPC_URL;
    await expect(distributeTokens('user')).rejects.toThrow('Token distribution environment not configured');
  });

  it('transfers tokens to user', async () => {
    await distributeTokens('user');
    expect(decimalsMock).toHaveBeenCalled();
    expect(transferMock).toHaveBeenCalledWith('user', '1-6');
  });
});
