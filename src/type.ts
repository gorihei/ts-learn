// type 構文は型に独自の名前を付けるもの
// 新しく型を作るわけではない。
//(下記はvalueというnumber型のプロパティを持つオブジェクトの型定義にCustomerTypeと名前を付けているだけ)
type CustomType = {
  value: number
}

// T型とobj変数の型は同じ
type T = {
  text: string
  value: number
}
const obj: {
  text: string
  value: number
} = {
  text: 'text',
  value: 15,
}
// これはOK
const foo: T = obj

// これはNG(型定義にないプロパティがある)
// const bar: T = {
//   text: 'text',
//   value: 1,
//   other: 12,
// }

const objEx = {
  text: 'text',
  value: 1,
  other: 1,
}

// これはOK
// bojExにはotherというTにはないプロパティが定義されているが、
// textとvalueが一致するため、TはobjExの部分型であるといえるため。
// 変数の宣言と代入を同時に行った時にエラーとなるのは、宣言時に明らかに使用できないプロパティがあるのは無意味であることを親切にコンパイラが教えてくれている
// 別々に宣言された変数の代入は、objExは別の用途としても使用できるものであるため、エラーとはしない仕様らしい
const bar: T = objEx

// 変数に型を明示することでコンパイル時に型チェックをしてくれる
const ok: T = {
  text: 'Hello',
  value: 2024,
}

// 下記2つはコンパイルエラー
// const ng1: T = {
//   text: 'Hello',
//   value: '2024', // not number
// }

// const ng2: T = {
//   text: 'Hello',
//   value: 2024,
//   other: 100, // undefined property
// }

// typeとinterfaceの違いはあまりない
// 拡張性等の差があるが、基本的にはtypeを使う方が好み(勝手にマージされるインターフェースは便利ではあるけど、バグの元になりそう)
// 交差型やユニオン型はtypeでしか作成できない。

// type
type TypeObj = {
  value: string | number
}

// interface
interface InterfaceObj {
  value: string
}

type ExObj = TypeObj & InterfaceObj & { text: string; other: any }
const a: ExObj = {
  // number型はNG(交差型は組み合わせた型定義の双方の型に一致しなければならない。)
  // TypeObjではvalueがstring or number、INterfaceObjではvalueがstringなので、
  // numberではInterfaceObjの型と異なるのでエラーになる
  value: '12',
  text: 'text',
  other: { foo: 1, bar: 2 },
}

console.log(a)

type ExObj2 = typeof a & { name: string; address?: string }
const b: ExObj2 = {
  value: '12',
  text: 'text',
  other: { foo: 1, bar: 2 },
  name: 'name',
}

console.log(b)
