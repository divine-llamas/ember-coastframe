// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseSimpleStorage {
    uint256 public storedValue;

    event ValueUpdated(uint256 oldValue, uint256 newValue);

    function setValue(uint256 newValue) external {
        uint256 old = storedValue;
        storedValue = newValue;
        emit ValueUpdated(old, newValue);
    }

    function getValue() external view returns (uint256) {
        return storedValue;
    }
}
