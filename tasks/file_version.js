/*
 * grunt-file-version
 * https://github.com/xiaoyunchen/fileVersion
 *
 * Copyright (c) 2015 陈云
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	
	var crypto = require('crypto'),
	baseCfg={
		versionName:'v',	//版本参数名称
		versionLength:8		//版本参数长度
	},
	splitPara='?'+baseCfg.versionName+'=',		//参数分隔符
	splitVersionLength=baseCfg.versionLength+splitPara.length;	//参数分隔符长度
	
	/**
	 * 获取静态资源文件新URL
	 * @param {Object} staticFileName 文件名称
	 * @param {Object} md5 MD5值
	 */
	function getStaticFileUrl(staticFileName, md5) {
		md5=md5.substring(0,baseCfg.versionLength);
		var newurl='';
		//already has version para, just update md5
		if(staticFileName.indexOf(splitPara)>=0){
			newurl = staticFileName.substring(0,staticFileName.length-baseCfg.versionLength) + md5;
		}else{
			newurl = staticFileName + splitPara + md5;
		}
		return newurl;
	}

	/**
	 * 替换html中静态资源文件引入路径（添加了版本号）
	 * @param {Object} fileSrc  html文件路径
	 * @param {Object} assetUrl  静态资源文件路径
	 */
	function replaceAssets(fileSrc, assetUrl) {
		if (grunt.file.exists(fileSrc)) {
			//read html file data
			var data = grunt.file.read(fileSrc);
			//read asset file data
			var assetData=grunt.file.read(assetUrl);
			//remove the directory
			assetUrl=assetUrl.substring(assetUrl.lastIndexOf('/'),assetUrl.length);
			
			//if the page file has the asset
			if (data.indexOf(assetUrl) >= 0) {
				
				var md5sum = crypto.createHash('md5');
				md5sum.update(assetData, 'utf-8');
				
				var reg=new RegExp('".*'+assetUrl+'.*"','g');
				var fullAssetUrl=reg.exec(data).toString();
				
				//如果Js src或css href路径中已经有版本号，先删除原版本号
				var len=fullAssetUrl.indexOf(splitPara)>-1?splitVersionLength:0;
				var assetName=fullAssetUrl.substr(fullAssetUrl.indexOf(assetUrl),assetUrl.length+len);
				var newurl = getStaticFileUrl(assetName, md5sum.digest('hex'));
				var newdata = data.replace(assetName, newurl);

				if (grunt.file.write(fileSrc, newdata)) {
					grunt.log.success(fileSrc + ' add ts successfully');
				} else {
					grunt.log.error(fileSrc + ' add ts failed');
				}
			} else {
				grunt.log.error('asset not found in file ' + fileSrc);
			}

		}

	}

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('file_version', 'add file version to js&css in the html', function() {
    	// Merge task-specific and/or target-specific options with these defaults.
   		 var options = this.options({

		 });

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {

			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Destination file "' + filepath + '" not found,check it!');
					return false;
				} else {
					grunt.log.success('Destination file "' + filepath + '" found.');
					replaceAssets(f.dest, filepath);
					return true;
				}
			});

		});
  });

};
