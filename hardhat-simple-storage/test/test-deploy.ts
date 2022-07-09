import { ethers } from 'hardhat'
import { assert } from 'chai'
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types'

describe('simple storage', function () {
  let simpleStorageFactory: SimpleStorage__factory
  let simpleStorage: SimpleStorage

  beforeEach(async function () {
    simpleStorageFactory = (await ethers.getContractFactory(
      'SimpleStorage'
    )) as SimpleStorage__factory
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it('fav number should be 0', async function () {
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), '0')
  })

  it('update store', async function () {
    const expectedValue = '3'
    await simpleStorage.store(expectedValue)
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })

  it('add persion', async function () {
    const PERSON_NAME = 'polly'
    const PERSON_NUMBER = '3'
    await simpleStorage.addPerson(PERSON_NAME, PERSON_NUMBER)
    let personFavNum = await simpleStorage.nameToFavNum(PERSON_NAME)
    assert.equal(personFavNum.toString(), PERSON_NUMBER)
  })
})
