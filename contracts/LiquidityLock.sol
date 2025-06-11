// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title LiquidityLock
/// @notice Simple vault that locks LP tokens until a specified time
contract LiquidityLock is Ownable {
    IERC20 public immutable lpToken;
    uint256 public unlockTime;

    constructor(address token, uint256 duration) Ownable(msg.sender) {
        require(token != address(0), "zero addr");
        lpToken = IERC20(token);
        unlockTime = block.timestamp + duration;
    }

    /// @notice Withdraw locked tokens after the unlock time
    function withdraw(address to) external onlyOwner {
        require(block.timestamp >= unlockTime, "locked");
        uint256 bal = lpToken.balanceOf(address(this));
        require(bal > 0, "no tokens");
        lpToken.transfer(to, bal);
    }
}
