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

2. 使用es7装饰器(`Decorator`)的配置(实例，_utils/decorators.js_)

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

    **补充：在vscode中运用es7的装饰器会有报错，非常不好看，错误如下：**
    ```
    [js] Experimental support for decorators is a feature that is subject to change in a future release
    ```
    解决方法：在jsconfig.json中添加如下配置：
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

    * 运用babel的插件提供组件别名  `babel-plugin-module-resolver`
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

https://zhuanlan.zhihu.com/p/24649359

https://zhuanlan.zhihu.com/p/26204569

5. `eslint` 代码检查配置(使用airbnb的标准 `eslint-config-airbnb`) && pre-commit，[eslint address](http://eslint.cn/)

    * airbnb的依赖有 `eslint`, `eslint-plugin-import`, `eslint-plugin-react`, and `eslint-plugin-jsx-a11y`.

    ```
    npm install --save-dev eslint babel-eslint eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-config-airbnb
    ```

    `babel-eslint` 如果运用了es6的新语法，则需要这个依赖，否则eslint会认为箭头函数等是错误的语法。
    
    `eslint-plugin-react` 识别react中的一些语法

    ```
    "devDependencies": {
        "babel-eslint": "^7.2.3",
        "eslint": "^4.1.1",
        "eslint-config-airbnb": "^15.0.1",
        "eslint-plugin-import": "^2.6.0",
        "eslint-plugin-jsx-a11y": "^5.0.3",
        "eslint-plugin-react": "^7.1.0",
    },

    ```

    * 配置`.eslintrc.js`文件(也可以是.json文件)
    
    ```
    module.exports = {
        parser: 'babel-eslint',
        parserOptions: {
            sourceType: 'module'
        },
        extends: "airbnb",
        plugins: [
            "react",
            "jsx-a11y",
            "import"
        ],
        rules: {
            // 0 = off, 1 = warn, 2 = error
            // FB配置参考：
            // https://github.com/facebook/react-native/blob/8baaad9b0fbda2b02bb1834452aa63cac7910dc5/.eslintrc

            "global-require": 0,
            "no-use-before-define": 0,
            "no-console": 0,
            "no-undef": 2,
            "no-plusplus":0,
            "no-unused-vars": 0,
            "block-scoped-var": 0,
            "complexity": 0,
            "consistent-return": 0,

            // allow async-await
            'generator-star-spacing': 0,
            "no-return-assign": 1,
            "react/jsx-filename-extension": 0,
            "react/self-closing-comp": 1,
            "react/jsx-closing-bracket-location": 0,
            "react/prop-types": 0, // 避免redux等注入属性的情况
            "react/react-in-jsx-scope":0, //因已经引入react-require插件，会自动补上React

            "linebreak-style": ["error", "windows"],
            "arrow-parens": 0,
            "babel/semi": 0,
            "global-require": 0,
            "import/prefer-default-export": 0,
            "no-mixed-operators": 0,
            "radix": 0,
            "semi": [2, "never"],
            "react/no-array-index-key": 0,
            "no-underscore-dangle": 0,
            "import/extensions": 0,
            "max-len": ["error", 180],
            "class-methods-use-this": 0,
            "react/no-multi-comp":0, //Declare only one React component per file
            "react/no-string-refs": 1,
        },

        // 这里设置可能用到的全局变量
        "globals": {
            "window": true,
            "fetch": true,
            "__DEV__": true,
            "__APP__": true,
            "__ANDROID__": true,
            "__IOS__": true
        }
    };  

    ```

    * issues:

        1. [object Object]: ESLint configuration is invalid: - Unexpected top-level property "ecmaFeatures".

            eslint > 4.0 与 `eslint-config-airbnb` 存在兼容问题，` eslint@3.19.0`

        2. Arrow function should not return assignment

            ```
            ref={ref => this.viewpager = ref}>
            warning  Arrow function should not return assignment

            ref={ref => (this.viewpager = ref)}>  
            can fix
            ```
    * pre-commit配置

    ```
    npm install --save-dev pre-commit

    //package.json中配置pre-commit

    "pre-commit":[
        "lint"
    ]

    ```

    * [添加发布自定义的模板](http://cnodejs.org/topic/57c68052b4a3bca66bbddbdd)

6. 单元测试配置

7. VSCode Debugger && React Native Debugger

    * VSCode安装`React Native Tools`,如需Debugger,`.babelrc`中至少包含`sourceMaps = true`.

        Example:
        ```
        {
            "presets": [
                "react-native" // this is required for debugging with react-native/packager/transformer
            ],
            "plugins": [],
            "sourceMaps": true // must be true react-native/packager/transformer using with node-module-debug
            // because of some bugs from vscode-node-debug & vscode-react-native, "sourceMaps" cannot be "inline" or "both"
        }         
        ```
    * Debug Android && Debug IOS（**Start package server && Build** ）

        在终端上，调出调试菜单，选择 Debug JS Remotly,在chrome中进行调试

    * Attach to package(常用的调试方法,在vscode中进行代码调试，也是直接在代码中打断点)

        1. start package server 

        2. Debug => Attach to package

        3. 在终端上，Debug JS Remotly

    
        

形成项目模板









