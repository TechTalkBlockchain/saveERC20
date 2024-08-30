import { ethers } from "hardhat";

async function main() {
    const web3CXITokenAddress = "0x9601EA3F2925F671a7312Bd70E73F9bB067575AB";
    const web3CXI = await ethers.getContractAt("IERC20", web3CXITokenAddress);

    const saveERC20ContractAddress = "0xE4e29FD83B5A1B8AAc815e3Aa57f8fDd12112e21";
    const saveERC20 = await ethers.getContractAt("ISaveERC20", saveERC20ContractAddress);

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);

    const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
    approveTx.wait();

    const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
    console.log("Contract balance before :::", contractBalanceBeforeDeposit);

    const depositAmount = ethers.parseUnits("150", 18);
    const depositTx = await saveERC20.deposit(depositAmount);

    console.log(depositTx);

    depositTx.wait();

    const contractBalanceAfterDeposit = await saveERC20.getContractBalance();

    console.log("Contract balance after :::", contractBalanceAfterDeposit);



    // Withdrawal Interaction
    const withdrawalAmount =await ethers.parseUnits("50", 18);
    const withdrawTx = await saveERC20.withdraw(withdrawalAmount);
    console.log("Withdrawal transaction:", withdrawTx);

    await withdrawTx.wait();

    const contractBalanceAfterWithdrawal = await saveERC20.getContractBalance();
    console.log("Contract balance after withdrawal :::", contractBalanceAfterWithdrawal);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
