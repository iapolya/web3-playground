import { assert, expect } from 'chai'
import { Contract } from 'ethers'
import { deployments, ethers, getNamedAccounts } from 'hardhat'
import { Address } from 'hardhat-deploy/dist/types'
import { MockV3Aggregator } from '../../typechain-types'

describe('FundMe', async function () {
  let fundMe: Contract
  let deployer: Address
  let mockV3Aggregator: MockV3Aggregator
  const sendValue = ethers.utils.parseEther('1')

  beforeEach(async function () {
    // в hardhat network просто доступные аккаунты
    // const accounts = await ethers.getSigners()
    // const account1 = accounts[0]

    deployer = (await getNamedAccounts()).deployer

    // вызов скриптов из /deploy с тегами
    await deployments.fixture(['all'])

    fundMe = await ethers.getContract('FundMe', deployer)
    mockV3Aggregator = await ethers.getContract('MockV3Aggregator', deployer)
  })

  describe('constructor', async function () {
    it('check mock address', async function () {
      const response = await fundMe.getPriceFeed()
      assert.equal(response, mockV3Aggregator.address)
    })
  })

  describe('fund', async function () {
    it('fails if there is no ETH', async function () {
      await expect(fundMe.fund()).to.be.revertedWith('Didnt send ehough')
    })

    it('send some ETH', async function () {
      await fundMe.fund({ value: sendValue })
      const response = await fundMe.getAmountByAddress(deployer)
      assert.equal(response.toString(), sendValue.toString())
    })

    it('add funder', async function () {
      await fundMe.fund({ value: sendValue })
      const response = await fundMe.getFunder(0)
      assert.equal(response, deployer)
    })
  })

  describe('withdraw', async function () {
    beforeEach(async function () {
      await fundMe.fund({ value: sendValue })
    })

    it('check balance after withdraw', async function () {
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const startingDeployerBalance = await fundMe.provider.getBalance(deployer)

      const transactionResponse = await fundMe.withdraw()
      const transactionReceipt = await transactionResponse.wait()
      const { gasUsed, effectiveGasPrice } = transactionReceipt
      const gasCost = gasUsed.mul(effectiveGasPrice)

      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const endingDeployerBalance = await fundMe.provider.getBalance(deployer)

      assert.equal(endingFundMeBalance.toString(), '0')
      assert.equal(
        startingFundMeBalance.add(startingDeployerBalance).toString(),
        endingDeployerBalance.add(gasCost).toString()
      )
    })
  })
})
