// type User = {
//   name: string
//   age: number
//   premiumUser: boolean
// }

// const data: string = `
// uhyo,26,1
// John Smith,17,0
// Mary Sue,14,1
// `
// const users: User[] = data
//   .split('\n')
//   .filter((row) => row)
//   .map((row) => {
//     const [name, age, premiumUser] = row.split(',')
//     return {
//       name: name,
//       age: Number(age),
//       premiumUser: Boolean(Number(premiumUser)),
//     }
//   })

// for (const user of users) {
//   if (user.premiumUser) {
//     console.log(`${user.name}(${user.age})はプレミアムユーザーです。`)
//   } else {
//     console.log(`${user.name}(${user.age})はプレミアムユーザーではありません。`)
//   }
// }

type User = {
  name: string
  age: number
}

type keys = keyof User

let key: keys = 'name'
console.log(key)
key = 'age'
console.log(key)
// これはエラー
// key = "error"
// console.log(key)

const obj = {
  value: null,
  tag: 'tag',
  text: 'text',
  nest: {
    value2: null,
    tag2: null,
    text2: null,
  },
}

// objKeysは "tag" | "text" | "value" | "nest" のユニオン型
// keyof はオブジェクトに含まれるすべてのプロパティ名のユニオン型を作成する
// ネストしているオブジェクトの中は無視される
type objKeys = keyof typeof obj

// as const を使用した場合、オブジェクトリテラルがすべてreadonlyになる
const constObj = {
  value: null,
  tag: 'tag',
  text: 'text',
  nest: {
    value2: null,
    tag2: null,
    text2: null,
  },
} as const

// as const を配列に使用した場合、readonly タプル型に変換される
// number[] ⇒ readonly [1,2,3,4,5]
const constArray = [1, 2, 3, 4, 5] as const

// string[]配列⇒ readonly ['太郎', '次郎', '花子']
const names = ['太郎', '次郎', '花子'] as const
// 型 T[K] のルックアップで型推論され、type Nameは '太郎' | '次郎' | '花子' のユニオン型になる
type Name = (typeof names)[number]
