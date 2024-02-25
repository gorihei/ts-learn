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

// type User = {
//   name: string
//   age: number
// }

// type keys = keyof User

// let key: keys = 'name'
// console.log(key)
// key = 'age'
// console.log(key)
// // これはエラー
// // key = "error"
// // console.log(key)

// const obj = {
//   value: null,
//   tag: 'tag',
//   text: 'text',
//   nest: {
//     value2: null,
//     tag2: null,
//     text2: null,
//   },
// }

// // objKeysは "tag" | "text" | "value" | "nest" のユニオン型
// // keyof はオブジェクトに含まれるすべてのプロパティ名のユニオン型を作成する
// // ネストしているオブジェクトの中は無視される
// type objKeys = keyof typeof obj

// // as const を使用した場合、オブジェクトリテラルがすべてreadonlyになる
// const constObj = {
//   value: null,
//   tag: 'tag',
//   text: 'text',
//   nest: {
//     value2: null,
//     tag2: null,
//     text2: null,
//   },
// } as const

// // as const を配列に使用した場合、readonly タプル型に変換される
// // number[] ⇒ readonly [1,2,3,4,5]
// const constArray = [1, 2, 3, 4, 5] as const

// // string[]配列⇒ readonly ['太郎', '次郎', '花子']
// const names = ['太郎', '次郎', '花子'] as const
// // 型 T[K] のルックアップで型推論され、type Nameは '太郎' | '次郎' | '花子' のユニオン型になる
// type Name = (typeof names)[number]

// // ユーザー定義型ガード

// type obj = {
//   value: unknown
// }

// const obj: obj = {
//   value: 'text',
// }

// // 戻り値を 引数名 is 型 とすることで、ユーザー定義型ガードを作成できる
// // 戻り値の方はBooleanになる
// // trueが返るイコール、引数は●●型であるという事
// // 判定ロジックの責任は実装者
// function isString(value: unknown): value is string {
//   return typeof value === 'string'
// }

// // こちらはもう一つのユーザー定義型ガードの書き方
// // asserts 引数名 is 型
// // 戻り値はvoid
// // こちらは処理内で条件を満たさない場合は例外を投げる形で使用する
// // C#のユニットテストのAssertのイメージ
// // 処理の中で例外を投げる必要がある場合はこちらを使用する
// function assertString(value: unknown): asserts value is string {
//   if (typeof value !== 'string') {
//     throw new Error('value not be string type')
//   }
// }

// console.log(`obj.valueはstring型である:${isString(obj.value)}`)

// assertString(12)

// MappedTypes

// type Fruit = 'apple' | 'orange' | 'strawberry'

// // FruitNumber型は 文字列型のユニオン型の構成要素をすべてnumber型のプロパティとして持つ型となる
// type FruitNumber = {
//   [prop in Fruit]: number
// }

// const numbers: FruitNumber = {
//   apple: 1,
//   orange: 2,
//   strawberry: 3,
// }

// type FruitNumberArray = {
//   [prop in Fruit]: prop[]
// }

// const numbersArray: FruitNumberArray = {
//   apple: ["apple", "apple"],
//   orange: ["orange"],
//   strawberry: ["strawberry", "strawberry", "strawberry"]
// }

// type User = {
//   firstName: string,
//   lastName: string,
//   age: number
// }

// type UserKeyof = {
//   [prop in keyof User]: number
// }

// const UserObj: UserKeyof = {
//   firstName: 12,
//   lastName: 12,
//   age: 12
// }

// type R = { readonly foo: number; bar?: string }

// // 修飾子型を含む
// // { readonly foo: boolean; bar?: boolean | undefined };
// type Test1 = { [P in keyof R]: boolean }

// // 修飾子型を含まない
// // { foo: boolean; bar: boolean };
// type Test2 = { [P in (keyof R)]: boolean };
// type Test3 = { [P in (keyof R)[][0]]: boolean };

// type R = { foo: number; [key: string]: number | string }

// // 修飾子型を含む
// // { foo: boolean; [key: string]: boolean }
// type Test1 = { [P in keyof R]: boolean }

// // そのまま
// type Test1 = Readonly<string | number | bigint | boolean | symbol | void | null | undefined>;
// // そのまま
// type Test2 = Readonly<true | 42 | 42n | "foo" | `bar${string}`>;

// // (number | undefined)[]
// type Test1 = Partial<number[]>;

// // [(number | undefined)?, (string | undefined)?]
// type Test2 = Partial<[number, string]>;

// // [(number | undefined)?, (string | undefined)?, ...(number | undefined)[]]
// type Test3 = Partial<[number, string, ...number[]]>;

// // -readonly でreadonlyを除去
// type Test1 = { -readonly [P in Readonly<number>]: number }
// const t1: Test1 = {
//   1: 1,
//   2: 2,
//   3: 3,
// }
// console.log(t1['1'])
// console.log(t1['2'])
// console.log(t1['3'])

// conditional types

// // 型引数の型によって型を切り替える
// // 下記の例でいえば、型引数Mが文字列型の場合は[string, string]のタプル型として振る舞う
// // 型引数Mが数値型の場合は[number,number,number]のタプル型として振る舞う
// type Args<M> = M extends string ? [string, string] : [number, number, number]

// // 関数と組み合わせて使用可能
// // 引数の型引数によって引数の型を切り替える
// function Func<M extends string | number>(mode: M, ...args: Args<M>) {
//   console.log(mode, ...args)
// }

// // 文字列 Foo Bar
// Func('文字列', 'Foo', 'Bar')

// // 100 1 2 3
// Func(100, 1, 2, 3)

type Option<T> =
  | {
      tag: 'some'
      value: T
    }
  | {
      tag: 'none'
    }

function func(arg: Option<number>) {
  if (isSome(arg)) {
    console.log(arg.value)
  }
}

function isSome<T>(option: Option<T>): option is Extract<Option<T>, { tag: 'some' }> {
  return option.tag == 'some'
}

const op: Option<number> = {
  tag: 'some',
  value: 12,
}

const noneOp: Option<number> = {
  tag: 'none',
}

func(op)
func(noneOp)

function doubleOption(obj: Option<number>) {
  return mapOption(obj, (x) => x * 2)
}

function mapOption<T, U>(option: Option<T>, callback: (x: T) => U): Option<U> {
  switch (option.tag) {
    case 'some':
      return {
        tag: 'some',
        value: callback(option.value),
      }
    case 'none':
      return {
        tag: 'none',
      }
  }
}

console.log(doubleOption(op))
console.log(doubleOption(noneOp))
