import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x9601EA3F2925F671a7312Bd70E73F9bB067575AB";

const SaveERC20Module = buildModule("SaveERC20Module", (m) => {

    const save = m.contract("SaveERC20", [tokenAddress]);

    return { save };
});

export default SaveERC20Module;

// Deployed SaveERC20: 0xE4e29FD83B5A1B8AAc815e3Aa57f8fDd12112e21
