import { run } from 'hardhat'

export const verify = async (contractAddresses: string, args: any[] = []) => {
  console.log('Verifying...')
  // run allow us to run (smeshno) any available tasks
  // to view tasks just run "yarn hardhat"
  // verify is a task from '@nomiclabs/hardhat-etherscan' plugin esli chto
  try {
    await run('verify:verify', {
      address: contractAddresses,
      constructorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified!')
    } else {
      console.log(e)
    }
  }
}
