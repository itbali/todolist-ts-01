import {ActionType, div, mult, numberReducer, sub, sum} from "./tasks";

test('sum of two numbers',()=>{
    //1. Тестовые данные для теста:
    const a:number = 10
    const b:number = 20
    //2. Выполнение тестируемого кода
    const result = sum(a,b)
    //3. Проверка результатов
    expect(result).toBe(30)
})

test('sub of two numbers',()=>{
    expect(sub(10,20)).toBe(-10)
})
test('mult of two numbers',()=>{
    expect(mult(10,20)).toBe(200)
})
test('div of two numbers',()=>{
    expect(div(10,20)).toBe(1/2)
})

test('sum of num with Reducer', ()=>{
    const salary:number = 1000
    const action: ActionType = {
        type: "SUM",
        num:300
    }
const result = numberReducer(salary,action)
    expect(result).toBe(1300)

})