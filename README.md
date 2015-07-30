# background 
> *前端开发过程中难免要处理js与css的缓存问题，一般需要为引用的js和css静态文件加入版本号，让浏览器可以知道文件是否有变更。<br/>
> *我们做法是为js/css静态文件产生一个MD5值，作为其对应的版本号，一旦文件有修改，那么对应的版本号也会变化。<br/>
> *显然这是一个重复性很高（因为js/css经常修改）的工作，所以我们可以用fileVersion来帮助我们自动完成这部分工作。<br/>

# grunt-file-version

> add file version to js&css in the html
> 为html中引用的js/css添加md5版本号

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

## The "file_version" task

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
> 版本号参数名称：`v`<br/>
> 版本号长度：`8`<br/>

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

#### example result
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


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Thanks
感谢[韩小麦](https://github.com/jessiehan)同学，我最初是使用你的[asset-cache-control](https://github.com/jessiehan/asset-cache-control)插件<br/>
部分代码也是借鉴你的插件

## Next
下个版本计划：`为静态文件添加cdn host`

## Release History
`0.1.0`	2015-7-30	发布fileVersion插件
