// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    uint256 public burnPercentage; // in whole numbers (e.g. 2 for 2%)
    uint256 public taxPercentage; // in whole numbers (e.g. 3 for 3%)
    address public taxWallet;

    bool public presaleActive;
    uint256 public presaleEnd;

    event BurnPercentageUpdated(uint256 newPercentage);
    event TaxPercentageUpdated(uint256 newPercentage);
    event TaxWalletUpdated(address newWallet);
    event PresaleStarted(uint256 duration);
    event PresaleEnded();

    constructor(
        string memory name,
        string memory symbol,
        uint256 supply,
        uint256 _burnPercentage,
        uint256 _taxPercentage,
        address _taxWallet
    ) ERC20(name, symbol) Ownable(msg.sender) {
        require(_burnPercentage + _taxPercentage <= 100, "invalid percentages");
        _mint(msg.sender, supply);
        burnPercentage = _burnPercentage;
        taxPercentage = _taxPercentage;
        taxWallet = _taxWallet;
    }

    // --- owner controls ---

    function setBurnPercentage(uint256 value) external onlyOwner {
        require(value + taxPercentage <= 100, "invalid burn");
        burnPercentage = value;
        emit BurnPercentageUpdated(value);
    }

    function setTaxPercentage(uint256 value) external onlyOwner {
        require(value + burnPercentage <= 100, "invalid tax");
        taxPercentage = value;
        emit TaxPercentageUpdated(value);
    }

    function setTaxWallet(address wallet) external onlyOwner {
        require(wallet != address(0), "zero addr");
        taxWallet = wallet;
        emit TaxWalletUpdated(wallet);
    }

    function startPresale(uint256 duration) external onlyOwner {
        presaleActive = true;
        presaleEnd = block.timestamp + duration;
        emit PresaleStarted(duration);
    }

    function endPresale() external onlyOwner {
        presaleActive = false;
        emit PresaleEnded();
    }

    // --- internal ---

    function _update(address from, address to, uint256 amount) internal override {
        if (presaleActive && block.timestamp < presaleEnd) {
            require(from == owner(), "presale in progress");
        }

        uint256 burnAmount = (amount * burnPercentage) / 100;
        uint256 taxAmount = (amount * taxPercentage) / 100;
        uint256 sendAmount = amount - burnAmount - taxAmount;

        if (burnAmount > 0) {
            super._update(from, address(0), burnAmount);
        }

        if (taxAmount > 0 && taxWallet != address(0)) {
            super._update(from, taxWallet, taxAmount);
        }

        super._update(from, to, sendAmount);
    }
}
