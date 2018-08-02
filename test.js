let store = require("store")

store.set("user", "wangjie");
console.log(store.get("user"))
store.remove("user");
console.log(store.get("user"))
console.log(store.get("user", "a"))

store.set("user", {name: "xuyanbiao", age: 20});
console.log(store.get("user").name)

store.set("school", {name: "lanzhou"});
store.each(function(value, key) {  // 这里key和value是反的
    console.log(key, "-->", value)
})

store.clearAll();
console.log(store.get("user"))
console.log(store.get("school"))

// 设置过期时常
store.addPlugin(require("store/plugins/expire"));  // 过期插件
store.set("token", "res.data.token", (new Date()).getTime() + (8*3600*1000));
console.log((new Date()).getTime() + (8*3600*1000))