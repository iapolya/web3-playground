const { ethers } = require('hardhat')
const { assert } = require('chai')

describe('simple storage', function () {
  let simpleStorageFactory
  let simpleStorage

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
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
    assert.equal(personFavNum, PERSON_NUMBER)
  })
})
