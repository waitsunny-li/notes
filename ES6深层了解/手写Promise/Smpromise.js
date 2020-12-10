/*
 * @Author: liweilong
 * @Date: 2020-11-10 09:57:47
 */
class Smpromise {
  constructor(exector) {
    this.state = 'pending' // (pending,fulfilled,rejected)
    this.error = undefined
    this.value = undefined
    // 存储then中成功的回调函数
    this.onResolvedCallbacks = [];
    // 存储then中失败的回调函数
    this.onRejectedCallbacks = [];
    // 执行器
    exector(this.reslove.bind(this), this.reject.bind(this))
  }

  reslove(res) {
    let self = this
    // 之所以定时器是为了让可以链式调用then或者catch
    setTimeout(() => {
      if (self.state === 'pending') {
        self.value = res
        // 改变状态
        self.state = 'fulfilled'
        // 运行保存在onResolvedCallbacks中的所有回调函数
        self.onResolvedCallbacks.map((cbObj, index) => {
          if (index === 0) {
            self.onResolvedCallbacks[index].value = self.value
          }
          // 获取前一个回调函数返回的值并把值作为下一个回调函数的参数 --同时也运行了当前回调函数
          let rsp = cbObj.f(cbObj.value)
          if (typeof self.onResolvedCallbacks[index + 1] !== 'undefined') {
            self.onResolvedCallbacks[index + 1].value = rsp
          }
        })
      }
    }, 0)

  }

  reject(error) {
    let self = this
    // 之所以定时器是为了让可以链式调用then或者catch
    setTimeout(() => {
      if (self.state === 'pending') {
        self.error = error
        // 改变状态
        self.state = 'rejected'
        // 运行保存在onRejectedCallbacks中的所有回调函数
        self.onRejectedCallbacks.map((cbObj, index) => {
          if (index === 0) {
            self.onRejectedCallbacks[index].value = self.value
          }
          // 获取前一个回调函数返回的值并把值作为下一个回调函数的参数 --同时也运行了当前回调函数
          let rsp = cbObj.f(cbObj.value)
          if (typeof self.onRejectedCallbacks[index + 1] !== 'undefined') {
            self.onRejectedCallbacks[index + 1].value = rsp
          }
        })
      }
    }, 0)
  }

  then(ct, et) {
    let self = this
    if (self.state === 'fulfilled') {
      ct(self.value)
    }
    if (self.state === 'rejected') {
      et(self.error)
    }

    // 如果异步，则state位于pending状态，为何？由于没有执行resolve或者reject函数，所以没有改变实例的状态state，就运行了then函数，state依然是pending
    if (self.state === 'pending') {
      self.onResolvedCallbacks.push({
        f: ct
      })
      self.onRejectedCallbacks.push({
        f: et
      })
    }

    return self
  }

  catch (et) {
    if (self.state === 'rejected') {
      et(self.error)
    }
    return self
  }
}


let pro = new Smpromise((resovle, reject) => {
  // setTimeout(() => {
  // }, 1000)
  resovle('hhhh')
})

pro.then(res => {
  console.log('----------第一个then------------' + res);
  return 'jjjj'
}, error => {
  console.log(error);
}).then(value => {
  console.log('----------第二个then------------');
  console.log(value);
}, error => {
  console.log(error);
})

// setTimeout(() => {
//   console.log(h);
//   h.then(res => {
//     console.log(res);
//   })
// }, 3000)