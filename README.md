# web-localstorage-plus

基于 localStorage 做了一层封装，使其更易用、更简洁、更强大

## 特点功能

---

- 命名空间
- 加解密
- 批量操作
- 过期时间
- onChange
- onExpire
- eventBus
- pinia 持久化
- 离线消息（限定vite+vue3）

## 安装

---

```js
    yarn add web-localstorage-plus
```

## 初始化

---

```ts
import createStorage from "web-localstorage-plus";
/**
 * @rootName {string} 根命名空间，默认值：web-localstorage-plus
 * @noUseLocalStorage {boolean} 是否禁用localStorage，默认值：true
 */
createStorage({
  rootName: "spp-storage",
});
```

## 参数说明

---

| 属性名     | 说明                                 | 类型                             |
| ---------- | ------------------------------------ | -------------------------------- |
| key        | 保存的键名                           | string                           |
| value      | 保存的键值                           | any（内部调用的 JSON.stringify） |
| namespace  | 命名空间                             | string                           |
| expireTime | 过期时间                             | number                           |
| encrypt    | 是否加密                             | boolean                          |
| isFlatten  | 是否将返回值拍平（仅批量操作时有效） | boolean                          |

## 基本使用

---

- useStorage

在 vue 或者 react 项目中，通过 useStorage 统一获取方式

```js
import { useStorage } from "web-localstorage-plus";
const storage = useStorage();
```

- setItem

```js
storage.setItem("a", 1);
storage.setItem("b", 2, true);
storage.setItem("c", 3, "space1");
storage.setItem("d", 4, 1000); // 设置1秒后过期
storage.setItem("e", 5, "space2", 5000, true);
storage.setItem([
  { key: "f", value: 4, namespace: "space3" },
  { key: "g", value: 5, namespace: "space4" },
]);
storage.setItem(
  [
    { key: "h", value: 6 },
    { key: "i", value: 7, encrypt: true },
  ],
  "space5"
);

/**
   "web-storage":{
       "a": 1,
       "b": "*",
       "space1": {
           "c": 3
       },
       "d": 4, // 1秒后自动删除
       "space2": {
           "e": "*"
       },
       "space3": {
           "f": 4
       },
       "space4": {
           "g": 5
       },
       "space5": {
           "h": 6,
           "i": "*"
       }
   }
    */
```

- getItem

```js
storage.getItem("a"); // 1
storage.getItem("c", "space1"); // 3
storage.getItem(["a", "b", "d"], true); // [1, 2, 4]
storage.getItem(["e"], "space2"); // [{value:5,namespace:"space2"}]
storage.getItem([
  "a",
  {
    key: "f",
    namespace: "space3",
  },
  {
    key: "c",
    namespace: "space1",
  },
]); // [1,4,3]
storage.getItem(
  [
    "a",
    {
      key: "c",
      namespace: "space1",
    },
  ],
  true
); // [1,3]
```

- removeItem

```js
storage.removeItem("a");
storage.removeItem("f", "space3");
storage.removeItem([
  "a",
  {
    key: "f",
    namespace: "space3",
  },
]);
```

- clear

```js
storage.clear();
storage.clear(["space2"]); // 将space2下的值清空
storage.clear(["space2"], true); // 将除了space2的其他命名空间下的值清空
```

## onChange、onExpire、postMessage、onMessage

---

- onMessage 与 postMessage

```js
storage.onMessage("login", (payload) => {
  console.log(payload);
});
storage.onMessage(
  "login",
  (payload) => {
    console.log(payload, "2");
  },
  false /* 指定参数2则不会被覆盖 */
);

setTimeout(() => {
  storage.postMessage("login", {
    user: "spp",
  });
}, 3000);
```

- onChange

```js
storage.onChange("age", (payload) => {
  const { newValue, oldValue, namespace } = payload;
  // 当age改变时触发
});

setTimeout(() => {
  storage.setItem / removeItem / clear();
}, 3000);
```

- onExpire

```js
storage.onExpire("d", () => {
  console.log("1s后被调用");
});
storage.onExpire("d", () => {
  console.log("5s后被调用");
});
```

## use

---

通过该接口能够参与到 web-storage 的内部运行逻辑，其接受一个函数类型，将在 "getItem" | "setItem" | "removeItem" | "clear"执行时被调用  
 当前加解密只是使用同等数量的"\*"对存储值做了替换，如果你想要使用 md5 或其他算法实现,可通过 use 进行重写

- 示例

```js
function userPlugin(payload) {
  const { key, wark, value, namespace, ctx } = params;
  if (wark === "setItem") {
    // do somting
  }
  return value;
}
storage.use(userPlugin);
```

## pinia持久化

由于涉及到hmr，因此将该能力提取到了[@web-localstorage-plus/pinia](https://github.com/supanpanCn/web-localstorage-plus-pinia)

## 离线消息

由于是针对vite+vue3的，故将其提取到了[@web-localstorage-plus/offline](https://github.com/supanpanCn/web-localstorage-plus-offline)