# web-storage

基于localStorage做了一层封装，使其更易用、更简洁、更强大

## 特点功能

---

 - 命名空间
 - 加解密
 - 响应式
 - 批量操作
 - 过期时间
 - onChange
 - onExpire
 - eventBus

## 安装

---

```js
    yarn add web-storage
```

## 使用

---

```ts
    import createStorage from 'web-storage'
    const storage = createStorage([,rootName])
```

## 参数说明

---

 | 属性名 | 说明 | 类型 | 
 | --- | --- | --- | 
 | key | 保存的键名 | string | 
 | value | 保存的键值 | any（内部调用的JSON.stringify） | 
 | namespace | 命名空间 | string |
 | expireTime | 过期时间 | number | 
 | encrypt | 是否加密 | boolean |


## 示例

---

 - setItem

 ```js
    storage.setItem('a',1)
    storage.setItem('b',2,true)
    storage.setItem('c',3,'space1')
    storage.setItem('d',4,1000) // 设置1秒后过期
    storage.setItem('e',5,'space2',1000,true)
    storage.setItem([{key:'f',value:4,namespace:'space3'},{key:'g',value:5,namespace:'space4'}])
    storage.setItem([{key:'h',value:6},{key:'i',value:7,encrypt:true}],'space5')

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
    storage.getItem('a') // 1
    storage.getItem('c','space1') // 3
    storage.getItem(['a','b','d'],true) // [1, 2, 4]
    storage.getItem(['e'],'space2') // [{value:5,namespace:"space2"}]
    storage.getItem([{
        key:'f',
        namespace:'space3'
    },{
        key:'c',
        namespace:'space1'
    }]) // [4,3]
    storage.getItem(['a',{
        key:'c',
        namespace:'space1'
    }],true) // [1,3]

```

- removeItem

```js
    storage.removeItem('a') 
    storage.removeItem('f','space3')
    storage.removeItem(['a',{
        key:'f',
        namespace:'space3'
    }])
```

- clear

```js
    storage.clear()
    storage.clear(['space2']) // 将space2下的值清空

```


