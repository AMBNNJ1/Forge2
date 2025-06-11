// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title PresaleEscrow
/// @notice Holds funds raised during a presale until finalized
contract PresaleEscrow is Ownable {
    mapping(address => uint256) public contributions;
    bool public finalized;

    event Deposited(address indexed user, uint256 amount);
    event Refunded(address indexed user, uint256 amount);
    event Finalized(address indexed to, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function deposit() external payable {
        require(!finalized, "closed");
        require(msg.value > 0, "zero");
        contributions[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function finalize(address payable to) external onlyOwner {
        require(!finalized, "done");
        finalized = true;
        emit Finalized(to, address(this).balance);
        to.transfer(address(this).balance);
    }

    function refund() external {
        require(!finalized, "done");
        uint256 amount = contributions[msg.sender];
        require(amount > 0, "none");
        contributions[msg.sender] = 0;
        emit Refunded(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }
}
