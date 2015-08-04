# Background 
> * 前端开发过程中难免要处理js与css的缓存问题，一般需要为引用的js和css静态文件加入版本号，让浏览器可以知道文件是否有变更。<br/>
> * 我们做法是为js/css静态文件产生一个MD5值，作为其对应的版本号，一旦文件有修改，那么对应的版本号也会变化。<br/>
> * 显然这是一个重复性很高（因为js/css经常修改）的工作，所以我们可以用fileVersion来帮助我们自动完成这部分工作。<br/>
> * 另外，在上线之前将HTML中引用的JS/CSS/IMG路径替换为静态服务器路径，也是一项需要自动构建来完成的工作。<br/>

# grunt-file-version

> add file version to js&css in the html<br/>
> 为html中引用的js/css添加md5版本号<br/>
> replace the js/css path with static server URL<br/>
> 使用静态服务器URL路径替换JS/CSS引用路径<br/>

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-file-version --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-file-version');
```

## 添加MD5版本号

### Overview
In your project's Gruntfile, add a section named `file_version` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  file_version: {
    js: {
        options: {
        },
        files: {
          'demo/index.html': ['demo/js/*.js'],
        },
      },
	  css: {
	    options: {
	    },
	    files: {
	      'demo/index.html': ['demo/css/*.css'],
	    },
	  },
  },
});
```

### Options
> 暂时无需配置，插件采用以下默认配置<br/>
> * 版本号参数名称：`v`<br/>
> * 版本号长度：`8`<br/>

### Usage Examples

#### Default Options
在本例中，我们将会为`index.html`中引用的js与css添加版本号<br/>
在配置js和css路径时，只需配置到目录即可

```js
grunt.initConfig({
  file_version: {
    js: {
        options: {
        },
        files: {
          'demo/index.html': ['demo/js/*.js'],
        },
      },
	  css: {
	    options: {
	    },
	    files: {
	      'demo/index.html': ['demo/css/*.css'],
	    },
	  },
  },
});
```

#### Example Result
##### 原始文件内容
```js
	<link rel="stylesheet" href="css/hello.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="css/world.css"/>
	
	<script src="js/hello.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/world.js" type="text/javascript" charset="utf-8"></script>
```	

##### 插件执行后结果
```js
	<link rel="stylesheet" href="css/hello.css?v=e1bcdd3a" type="text/css" />
	<link rel="stylesheet" type="text/css" href="css/world.css?v=6ec18d77"/>
	
	<script src="js/hello.js?v=10f59858" type="text/javascript" charset="utf-8"></script>
	<script src="js/world.js?v=0120e944" type="text/javascript" charset="utf-8"></script>
```	


## 使用静态服务器URL路径

### Overview
In your project's Gruntfile, add a section named `file_version` to the data object passed into `grunt.initConfig()`.<br/>
使用静态服务器URL路径替换JS/CSS引用路径
```js
grunt.initConfig({
  file_version: {
    js: {
        options: {
       		 cdnhost:'http://static.youcdnhost.com/'
        },
        files: {
          'demo/index.html': ['demo/js/*.js'],
        },
      },
	  css: {
	    options: {
	    },
	    files: {
	      'demo/index.html': ['demo/css/*.css'],
	    },
	  },
  },
});
```

### Options
> * 静态服务器URL：`cdnhost` &nbsp;&nbsp;&nbsp;需要完整的URL路径，如`http://static.youcdnhost.com/`<br/>

### 注意事项
如果需要使用静态服务器URL替换，那么最后生成规则如下：
> * 静态服务器URL + JS/CSS配置路径  + MD5版本号
所谓配置路径，就是在gruntfile中配置的路径，例如本例中的`demo/js/*.js`<br/>
如果您只需要使用MD5版本号的话，插件则不会修改html中js/css原引用路径，只会在末尾添加上版本号 
> * html中原引用路径 + MD5版本号
比如您在HTML中的引用路径为`../framework/jquery/1.4.2/jquery.min.js`

### Usage Examples

#### Default Options
在本例中，我们将会为`index.html`中引用的js同时添加版本号和静态服务器URL<br/>
css只添加MD5版本号<br/>
在配置js和css路径时，只需配置到目录即可<br/>

```js
grunt.initConfig({
  file_version: {
    js: {
        options: {
        	 cdnhost:'http://static.youcdnhost.com/'
        },
        files: {
          'demo/index.html': ['demo/js/*.js'],
        },
      },
	  css: {
	    options: {
	    },
	    files: {
	      'demo/index.html': ['demo/css/*.css'],
	    },
	  },
  },
});
```

#### Example Result
##### 原始文件内容
```js
	<link rel="stylesheet" href="css/hello.css?v=e1bcdd3a" type="text/css" />
	<link rel="stylesheet" type="text/css" href="css/world.css?v=6ec18d77"/>
	
	<script src="js/hello.js?v=10f59858" type="text/javascript" charset="utf-8"></script>
	<script src="js/world.js?v=0120e944" type="text/javascript" charset="utf-8"></script>
	<script src="js/app/app.js?v=c1443dbd" type="text/javascript" charset="utf-8"></script>
```	

##### 插件执行后结果
```js
	<link rel="stylesheet" href="css/hello.css?v=b963d6e4" type="text/css" />
	<link rel="stylesheet" type="text/css" href="css/world.css?v=6ec18d77"/>
	
	<script src="http://static.youcdnhost.com/demo/js/hello.js?v=10f59858" type="text/javascript" charset="utf-8"></script>
	<script src="http://static.youcdnhost.com/demo/js/world.js?v=0120e944" type="text/javascript" charset="utf-8"></script>
	<script src="http://static.youcdnhost.com/demo/js/app/app.js?v=c1443dbd" type="text/javascript" charset="utf-8"></script>
```	


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Thanks
感谢[韩小麦](https://github.com/jessiehan)同学，我最初是使用你的[asset-cache-control](https://github.com/jessiehan/asset-cache-control)插件<br/>
部分代码也是借鉴你的插件

## Release History
`0.2.0` &nbsp;&nbsp;	2015-8-4&nbsp;&nbsp;	新功能：使用静态服务器URL替换JS/CSS路径<br/>
`0.1.0` &nbsp;&nbsp;	2015-7-30&nbsp;&nbsp;	发布fileVersion插件
