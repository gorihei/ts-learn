type User = {
  name: string
  age: number
  premiumUser: boolean
}

const data: string = `
uhyo,26,1
John Smith,17,0
Mary Sue,14,1
`
const users: User[] = data
  .split('\n')
  .filter((row) => row)
  .map((row) => {
    const [name, age, premiumUser] = row.split(',')
    return {
      name: name,
      age: Number(age),
      premiumUser: Boolean(Number(premiumUser)),
    }
  })

for (const user of users) {
  if (user.premiumUser) {
    console.log(`${user.name}(${user.age})はプレミアムユーザーです。`)
  } else {
    console.log(`${user.name}(${user.age})はプレミアムユーザーではありません。`)
  }
}
