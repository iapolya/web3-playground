import { getNamedAccounts, ethers } from 'hardhat'

async function main() {
  const { deployer } = await getNamedAccounts()
  const fundMe = await ethers.getContract('FundMe', deployer)

  const fundResponse = await fundMe.fund({
    value: ethers.utils.parseEther('0.1'),
  })

  await fundResponse.wait(1)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
