import {validateText} from '../validateText'

test("validateText 函数可以正确过滤输入",() => {
  //过滤空字符串
  expect(validateText("       ")).toBeFalsy()
  //过滤单词总字母长度不足一半的情况
  expect(validateText("This is 1234")).toBeTruthy()
  expect(validateText("This is 12345")).toBeFalsy()
  //过滤 HTTP协议开头的情况
  expect(validateText("http://baidu.com")).toBeFalsy()
  expect(validateText("https://baidu.com")).toBeFalsy()
})