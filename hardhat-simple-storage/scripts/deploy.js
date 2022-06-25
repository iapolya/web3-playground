const { ethers, run } = require('hardhat')
require('dotenv').config()

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying...')
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log('Address', simpleStorage.address)

  // only rinkeby netowork
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentFavNumber = await simpleStorage.retrieve()
  console.log(`Current favourite number: ${currentFavNumber.toString()}`)

  const transactionResponse = await simpleStorage.store('3')
  await transactionResponse.wait(1)
  const updatedFavNumber = await simpleStorage.retrieve()
  console.log(`Updated favourite number: ${updatedFavNumber.toString()}`)
}

async function verify(contractAddresses, args) {
  console.log('Verifying...')
  // run allow us to run (smeshno) any available tasks
  // to view tasks just run "yarn hardhat"
  // verify is a task from '@nomiclabs/hardhat-etherscan' plugin esli chto
  try {
    await run('verify:verify', {
      address: contractAddresses,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified!')
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
