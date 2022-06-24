const { ethers } = require('hardhat')

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying...')
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log('Address', simpleStorage.address)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
