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


	function getNewAssetsUrl(assetName, md5) {
		md5=md5.substring(0,baseCfg.versionLength);
		var newurl='';
		//already has ts, just update md5
		if(assetName.indexOf(splitPara)>=0){
			newurl = assetName.substring(0,assetName.length-baseCfg.versionLength) + md5;
		}else{
			newurl = assetName + splitPara + md5;
		}

		return newurl;
	}

	function replaceAssets(fileSrc, assetUrl) {
		if (grunt.file.exists(fileSrc)) {
			//read page file data
			var data = grunt.file.read(fileSrc);
			//read asset file data
			var assetData=grunt.file.read(assetUrl);
			//remove the directory
			assetUrl=assetUrl.substring(assetUrl.lastIndexOf('/'),assetUrl.length);
			
			//if the page file has the asset
			if (data.indexOf(assetUrl) >= 0) {
				
				var md5sum = crypto.createHash('md5');
				md5sum.update(assetData, 'utf-8');
				
				//get the full asset text, like "text/javascript" src="js/hello.js?t=cefe2283"
				var reg=new RegExp('".*'+assetUrl+'.*"','g');
				var fullAssetUrl=reg.exec(data).toString();
				
				//only leave hello.js?t=cefe2283
				var len=fullAssetUrl.indexOf(splitPara)>-1?splitVersionLength:0;
				var assetName=fullAssetUrl.substr(fullAssetUrl.indexOf(assetUrl),assetUrl.length+len);
				var newurl = getNewAssetsUrl(assetName, md5sum.digest('hex'));
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
			// Concat specified files.

			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					grunt.log.success('Source file "' + filepath + '" found.');
					replaceAssets(f.dest, filepath);
					return true;
				}
			});

		});
  });

};
