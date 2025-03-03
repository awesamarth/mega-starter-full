// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {GmegaCounter} from "../src/GmegaCounter.sol";

contract CounterTest is Test {
    GmegaCounter public gmegaCounter;

    function setUp() public {
        gmegaCounter = new GmegaCounter();
    }

    function test_Increment() public {
        gmegaCounter.increment();
        assertEq(gmegaCounter.gmegaCount(), 1);
    }

}
