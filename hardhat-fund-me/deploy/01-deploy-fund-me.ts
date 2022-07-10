import { network } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/dist/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { developmentChains, networkConfig } from '../helper-hardhat-config'
import { verify } from '../utils/verify'

const deployFundMe: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  let ethUsdPriceFeedAddress

  if (developmentChains.includes(network.name)) {
    const ethUsdAddregator = await deployments.get('MockV3Aggregator')
    ethUsdPriceFeedAddress = ethUsdAddregator.address
  } else if (chainId) {
    ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed
  }

  const args = [ethUsdPriceFeedAddress]
  const fundMe = await deploy('FundMe', {
    from: deployer,
    args,
    log: true,
  })

  log(fundMe.address)

  if (!developmentChains.includes(network.name)) {
    // verify code
    await verify(fundMe.address, args)
  }
}

export default deployFundMe
deployFundMe.tags = ['all', 'fundMe']
