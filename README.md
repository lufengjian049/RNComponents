### React-native 项目的通用配置&&自定义组件

1. 因JSX隐式的依赖当前环境下的React对象，所以在文件的开头都会显式的引入 `import React from 'react'`,会造成一个没有引用的变量存在。(**注：此插件只是帮我们自动引用一个React常量，有状态组件还是需要引入Component**)
    
    * 安装 `babel-plugin-react-require`

    ```
    npm install --save-dev babel-plugin-react-require

    ```

    * 在 `.babelrc` 中添加 `react-require` ，注意：这个插件应该在`transform-es2015-modules-commonjs`插件之前定义，因为它使用ES2015模块语法将React导入进来

    ```
    {
        "plugins":[
            "react-require"
        ]
    }

    ```

2. 使用es7装饰器(`Decorator`)的配置

    * 安装 `babel-plugin-transform-decorators-legacy`

    ```
    npm install --save-dev babel-plugin-transform-decorators-legacy

    ```

    * 在 `.babelrc` 中添加 `transform-decorators-legacy` 

     ```
    {
        "plugins":[
            "transform-decorators-legacy"
        ]
    }

    ```   

    **补充：在vscode中运用es7的装饰器会有报错，非常不好看，错误如下：**
    ```
    [js] Experimental support for decorators is a feature that is subject to change in a future release
    ```
    解决方法：在jsconfig.json中添加如下配置：
    ```
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
    ```

3. 启用组件别名(`Component Alias`)的两种配置方式，解决引用文件时相对路径过长问题

    * 在文件的头部使用关键字 `@providesModule`

    ``` 
    /**
     * @providesModule Carousel
     */
     import {View} from 'react-native'
    ```

    引用的时候直接引用组件的别名

    ```
    import Carousel from 'Carousel'

    ```

    此方法很便捷，但是不推荐使用，哪天facebook抽风，把这个关键字拿掉了就歇菜了，所以安全起见还是看下面这个靠谱一点的方法。

    * 运用babel的插件提供组件别名
        * 安装 `babel-plugin-module-alias`
        ```
        npm install --save babel-plugin-module-alias    

        ```  
        * 在`.babelrc`中添加插件配置
         ```
        {
            "plugins":[[
                "module-alias", [
                    { "src": "./app", "expose": "app" },
                    { "src": "./app/resources/icon", "expose": "icon" }
                ]
            ]]
        }

        ```
        * 清除缓存，重新起服务
        ```
        npm start -- --reset-cache        

        ```
4. `Flow` 静态类型检查配置

5. `eslint` 代码检查配置

6. 单元测试配置

7. React Native Debugger

形成项目模板









