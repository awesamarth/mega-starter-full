// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {GmegaCounter} from "../src/GmegaCounter.sol";

contract GmegaCounterScript is Script {
    GmegaCounter public gmegaCounter;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        gmegaCounter = new GmegaCounter();

        vm.stopBroadcast();
    }
}
