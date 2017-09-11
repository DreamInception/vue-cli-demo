import {isNum,isString} from '@/pages/index/index.js'
console.log('开始测试')
describe('index.js的测试', function () {
  it('1应该是数字', function() {
    // expect(isNum(1)).to.be.true
    isNum(1).should.equal(true)
  })
  it('"11" 应该是字符', function() {
    // expect(isString('1')).to.be.true
    isString('1').should.equal(true)
  })
})
