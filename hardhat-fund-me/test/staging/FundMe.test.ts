import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert } from 'chai'
import { Contract } from 'ethers'
import { ethers, getNamedAccounts, network } from 'hardhat'
import { Address } from 'hardhat-deploy/dist/types'
import { developmentChains } from '../../helper-hardhat-config'

developmentChains.includes(network.name)
  ? describe.skip
  : describe('FundMe(staging)', async function () {
      let fundMe: Contract
      let deployer: SignerWithAddress
      const sendValue = ethers.utils.parseEther('0.1')

      beforeEach(async function () {
        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        fundMe = await ethers.getContract('FundMe', deployer.address)
      })

      it('send some ETH and withdraw it', async function () {
        await fundMe.fund({ value: sendValue })
        await fundMe.withdraw()
        const currentBalance = await fundMe.provider.getBalance(fundMe.address)
        assert.equal(currentBalance.toString(), '0')
      })
    })
