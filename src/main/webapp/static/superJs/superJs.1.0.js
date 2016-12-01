/**
 * author zpr
 * v1.0
 * @type 
 */
var Super = {
	/**
	 * 创建命名空间,命名空间首字母大写.
	 * @param ns
	 * @returns {___anonymous_Super}
	 */
	namespace:function(ns){
		var parts = ns.split("."),
		object = this,
		i,len;
		
		for( i=0,len=parts.length;i<len;i++ ){
			if( !object[parts[i]] ){
				object[parts[i]] = {};
			}
			object = object[parts[i]];
		}
		
		return object;
	}
};
/**
 * 常用方法
 * 
 * @type
 */
Super.CommonUtil = {

	/**
	 * 生成0-9之间的随机数,num为生成几位,比如num=3 ..可能生成123
	 * @param num
	 * @returns {string}
     */
	random:function(num){
		var random = "";
		for(var i=0;i<num;i++){
			random+=parseInt(10*Math.random())+"";
		}
		return random;
	},
	/**
	 * 字符串类型数字保留小数返回字符串类型
	 * @param digit
     */
	stringTodecimals:function(str,digit){
			
			if(str==0){
				return 0;
			}

			str+="";

			var strLength = str.length;

			if(digit == strLength){
				return "0." + str;
			}

			if(digit>strLength){
				for(var i=0;i<digit-strLength;i++){
					str = "0" + str;
				}
				str = "0." + str;
			}

			if(digit<strLength){
				var index = strLength-digit;
				str = str.substring(0,index) + "." + str.substring(index);
			}

			var endStr = str.split(".")[1];
			var intStr = parseInt(endStr);

			if(intStr == 0){
				str = str.substring(0,str.indexOf("."));
			}
			return str;

	},
	/**
	 * 函数运行时间
	 * 
	 * @param {}
	 *            fn
	 * @return {}
	 */
	runTime : function(fn) {
		var start = +new Date();
		// 获得除第一个参数后的所有参数
		var args = Array.prototype.slice.call(arguments, 1);
		fn.apply(null, args);
		var stop = +new Date();
		return stop - start;
	},
	/**
	 * 获得一个字符串中,字符出现的位置
	 * 
	 * @param {}
	 *            str
	 * @param {}
	 *            c
	 * @return {}
	 */
	getCharIndex : function(str, c) {
		var positions = [], pos = str.indexOf(c);
		while (pos > -1) {
			positions.push(pos);
			pos = str.indexOf(c, pos + 1);
		}
		return positions;
	},
	/**
	 * 转义<>"&
	 * 
	 * @param {}
	 *            text
	 * @return {}
	 */
	htmlEscape : function(text) {
		return text.replace(/[<>"&]/g, function(match, pos, originalText) {
					switch (match) {
						case "<" :
							return "&lt;";
						case ">" :
							return "&gt;";
						case "&" :
							return "&amp;";
						case "\"" :
							return "&quot;";
					}
				});
	},
	/**
	 * 判断对象属性是否为继承的原型属性
	 * 
	 * @param {}
	 *            object
	 * @param {}
	 *            name
	 * @return {}
	 */
	hasPrototypeProperty : function(object, name) {
		return !object.hasOwnProperty(name) && (name in object);
	},
	/**
	 * 克隆对象
	 * 
	 * @param {}
	 *            o
	 * @return {}
	 */
	object : function(o) {
		function F() {
		}
		F.prototype = o;
		return new F();
	},
	/**
	 * 寄生组合继承 
	 * 例子: 
	 * function SuperType(name){ 
	 *    this.name = name; 
	 *    this.colors =["red","blue","green"]; 
	 * } 
	 * SuperType.prototype.sayName = function(){
	 *           alert(this.name); 
	 * } 
	 * function SubType(name,age){
	 *      SuperType.call(this,name);
	 *      this.age = age; 
	 * } 
	 * inheritPrototype(SubType,SuperType);
	 * SubType.prototype.sayAge = function(){ alert(this.age); };
	 * 
	 * @param {}
	 *            subType
	 * @param {}
	 *            superType
	 */
	inheritPrototype : function(subType, superType) {
		function F() {
		}
		F.prototype = superType.prototype;
		var o = new F();
		o.constructor = subType;
		subType.prototype = o;
	},
	/**
	 * 继承对象
	 */
	inherit:function(p){
	   if(p==null)throw TypeError();
	   if(Object.create)return Object.create(p);
	   var t = typeof p;
	   if(t!=="object" && t!=="function") throw TypeError();
		function F() {
		}
		F.prototype = p;
	   return new F();
	},
	/**
	 * 获得get请求参数 
	 * 例如:
	 * ?q=javascript&num=10 
	 * var args = getQueryStringArgs();
	 * alert(args["q"]);//"javascript"
	 * alert(args["num"]);//"10"
	 * @return {}
	 */
	getQueryStringArgs : function() {
		var qs = (location.search.length > 0
				? location.search.substring(1)
				: ""), args = {}, items = qs.length ? qs.split("&") : [], item = null, name = null, value = null, i = 0, len = items.length;
		for (i = 0; i < len; i++) {
			item = items[i].split("=");
			name = decodeURIComponent(item[0]);
			value = decodeURIComponent(item[1]);
			if (name.length) {
				args[name] = value;
			}
		}
		return args;
	},
	/**
	 * 检查某对象是否包含一个属性或方法 result = isHostMethod(xhr,"open");//true
	 * 
	 * @param {}
	 *            object
	 * @param {}
	 *            property
	 * @return {}
	 */
	isHostMethod : function(object, property) {
		var t = typeof object[property];
		return t == 'function' || (!!(t == 'object' && object[property]))
				|| t == 'unknown';
	},
	/**
	 * 动态加载javascript
	 * 
	 * @param {}
	 *            url
	 */
	loadScript : function(url) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		document.body.appendChild(script);
	},
	/**
	 * 动态执行script代码.同eval()函数
	 * 
	 * @param {}
	 *            code
	 */
	loadScriptString : function(code) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		try {
			script.appendChild(document.createTextNode(code));
		} catch (ex) {
			script.text = code;
		}
		document.body.appendChild(script);
	},
	/**
	 * 动态加载css文件
	 * 
	 * @param {}
	 *            url
	 */
	loadStyles : function(url) {
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = url;
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(link);
	},
	/**
	 * 动态加载style 例如:loadStyleString("body{background-color:red}");
	 * 
	 * @param {}
	 *            css
	 */
	loadStyleString : function(css) {
		var style = document.createElement("style");
		style.type = "text/css";
		try {
			style.appendChild(document.createTextNode(css));
		} catch (ex) {
			style.styleSheet.cssText = css;
		}
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(style);
	},
	/**
	 * 序列化表单
	 * 
	 * @param {}
	 *            form
	 * @return {}
	 */
	serialize : function(form) {
		var parts = [], field = null, i, len, j, optLen, option, optValue;
		for (i = 0, len = form.elements.length; i < len; i++) {
			field = form.elements[i];

			switch (field.type) {
				case "select-one" :
				case "select-multiple" :
					if (field.name.length) {
						for (j = 0, optLen = field.options.length; j < optLen; j++) {
							option = field.options[j];
							if (option.selected) {
								optValue = "";
								if (option.hasAttribute) {
									optValue = (option.hasAttribute("value")
											? option.value
											: option.text);
								} else {
									optValue = (option.attributes["values"].specified
											? option.value
											: option.text);
								}
								parts.push(encodeURIComponent(field.name) + "="
										+ encodeURIComponent(optValue));
							}
						}
					}
					break;
				case undefined :
				case "file" :
				case "submit" :
				case "reset" :
				case "button" :
					break;
				case "radio" :
				case "checkbox" :
					if (!field.checked) {
						break;
					}
				default :
					if (field.name.length) {
						parts.push(encodeURIComponent(field.name) + "="
								+ encodeURIComponent(field.value));
					}
			}
		}
		return parts.join("&");
	},
	/**
	 * 增加url参数
	 * 
	 * @param {}
	 *            url
	 * @param {}
	 *            name
	 * @param {}
	 *            value
	 * @return {}
	 */
	addQueryStringArg : function(url, name, value) {
		url += (url.indexOf("?") == -1 ? "?" : "&");
		url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
		return url;
	},
	/**
	 * 绑定函数作用域 
	 * 就是将一个函数绑定到一个对象的作用域上去执行.这个函数可以调用绑定到对象的属性。
	 * 例如: 
	 * var handler = { 
	 *         message:"Event handled",
	 *         handleClick:function(event){
	 *             alert(this.message);
	 *         } 
	 * }; 
	 * var btn = document.getElementById("my-btn");
	 * Super.Event.addHandler(btn,"click",bind(handler.handleClick,handler));
	 * 
	 * @param {}
	 *            fn
	 * @param {}
	 *            context
	 * @return {}
	 */
	bind : function(fn, context) {
		var args = Array.prototype.slice.call(arguments, 2);
		return function() {
			var innerArgs = Array.prototype.slice.call(arguments);
			var finalArgs = args.concat(innerArgs);
			return fn.apply(context, finalArgs);
		};
	},
	/**
	 * 柯里化函数 
	 * 例如： 
	 * function add(num1,num2){ return num1+num2; } 
	 * var curriedAdd = curry(add,5); 
	 * alert(curriedAdd(3));//8
	 * 
	 * var curriedAdd = curry(add,5,12);
	 * alert(curriedAdd());//17
	 * 
	 * @param {} fn
	 */
	curry : function(fn) {
		var args = Array.prototype.slice.call(arguments, 1);
		return function() {
			var innerArgs = Array.prototype.slice.call(arguments);
			var finalArgs = args.concat(innerArgs);
			return fn.apply(null, finalArgs);
		};
	},
	/**
	 * 链式定时器,只有完成上次操作,才会再次定时处理
	 * 
	 * @param {}
	 *            fn
	 * @param {}
	 *            interval
	 */
	linkSetTimeOut : function(fn, interval) {
		setTimeout(function() {
					fn();
					setTimeout(arguments.callee, interval);
				}, interval);
	},
	/**
	*安排函数f在未来的调用模式
	*f为要调用的函数
	*start为第一次调用时间毫秒数.
	*interval为每隔多久调用一次
	*end为多久后结束调用
	*
	*当值传入 f和start时 相当于setTimeout(f,start)的用法
	*
	*/
	invoke:function(f,start,interval,end){
       if(!start)start = 0;
       if(arguments.length<=2){
       	 setTimeout(f,start);
       }else{
       	 setTimeout(repeat,start);
       	 function repeat(){
       	 	var h = setInterval(f,interval);
       	 	if(end){
       	 		setTimeout(function(){
                   clearInterval(h);
       	 		},end);
       	 	}
       	 }
       }
	},
	/**
	 * 函数节流,在resize事件中常用.因为在短时间过多计算布局; 函数节流背后的基本思想是指,某些代码不可以在没有间断的情况连续重复执行 例如:
	 * 这个监听会导致浏览器运行缓慢 
	 * window.onresize = function(){ 
	 *    var div =document.getElementById("myDiv"); 
	 *    div.style.height = div.offsetWidth+"px"; 
	 * } 
	 * 改为: 
	 * function resizeDiv(){ 
	 *      var div =document.getElementById("myDiv"); 
	 *      div.style.height =div.offsetWidth+"px"; 
	 * } 
	 * window.onresize = function(){throttle(resizeDiv); }
	 * 
	 * @param {}
	 *            method
	 * @param {}
	 *            context
	 */
	throttle : function(method, context) {
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
					method.call(context);
				}, 100);
	},
	/**
	 * 获得本地存储.兼容只支持globalStorage浏览器的.
	 * 
	 * @return {}
	 */
	getLocalStorage : function() {
		if (typeof localStorage == "object") {
			return localStorage;
		} else if (typeof globalStorage == "object") {
			return globalStorage[location.host];
		} else {
			throw new Error("Local storage not available.");
		}
	},
	/**
	 * 返回对象全部属性
	 * @param {} object
	 * @return {}
	 */
	allProperty:function(obj){
       var props = "";
       if(typeof obj =="object"){
	       for(var p in obj){ 
		        if(typeof(obj[p])=="function"){ 
		            obj[p]();
		        }else{ 
		            props+= p + "=" + obj[p] + "\n";
		        } 
	       } 
       }
       return props;
	},
	/**
	 * 把p中的可枚举属性复制到o中,并返回o
	 * 如果o和p中含有同名属性,则覆盖o中的属性
	 * 这个函数并不处理getter和setter以及复制属性
	 * @param {} o
	 * @param {} p
	 */
	extend:function(o,p){
	   for(prop in p){
	       o[prop] = p[prop];
	   }
	},
	/**
	 * 将p中的可枚举属性复制至o中,并返回o
	 * 如果o和p中有同名的属性,o中同名属性不受影响
	 * 这个函数并不处理getter和setter以及复制属性
	 * @param {} o
	 * @param {} p
	 */
	merge:function(o,p){
	   for(prop in p){
	      if(o.hasOwnProperty[prop])continue;
	      o[prop] = p[prop];
	   }
	   return o;
	},
	/**
	 * 如果o中的属性在p中没有同名属性,则从o中删除这个属性
	 * @param {} o
	 * @param {} p
	 * @return {}
	 */
	restrict:function(o,p){
	   for(prop in o){
	   	   if(!(prop in p))delete o[prop];
	   }
	   return o;
	},
	/**
	 * 如果o中的属性在p中有同名属性,则从o中删除这个属性
	 * @param {} o
	 * @param {} p
	 * @return {}
	 */
	subtract:function(o,p){
	   for(prop in p){
	      delete o[prop];
	   }
	   return o;
	},
	/**
	 * 返回一个新对象,这个对象同时拥有o的属性和p的属性
	 * 如果o和p中有重名属性,使用p中的属性值
	 * @param {} o
	 * @param {} p
	 * @return {}
	 */
	union:function(o,p){
	   return this.extend(extend({},o),p);
	},
	/**
	 * 返回一个新对象,这个对象拥有同时在o和p中出现的属性
	 * 很像求o和p的交集,但p中属性的值被忽略
	 * @param {} o
	 * @param {} p
	 * @return {}
	 */
	intersection:function(o,p){
		return this.restrict(extend({},o),p);
	},
	/**
	 * 返回一个数组,这个数组包含的是o中可枚举的自由属性的名字
	 * @param {} o
	 * @return {}
	 */
	keys:function(o){
	    if(typeof o!== "object") throw TypeError();
	    var result = [];
	    for(var prop in o){
	       if(o.hasOwnProperty(prop)){
	       	   result.push(prop);
	       }
	    }
	    return result;
	},
	/**
	 * 复制一个对象的所有属性到一个数组中.
	 * @param {} obj
	 * @return {}
	 */
	copyObjProperty:function(obj){
        if(typeof obj === 'object'){
            var a = [],i=0;
            for(a[i++] in obj);
            return a;
        }	
	},
	/**
	 * 获得对象所属类
	 * @param {} o
	 * @return {String}
	 */
	classOf:function(o){
	   if(o===null) return "Null";
	   if(o===undefined) return "Undefined";
	   return Object.prototype.toString.call(o).slice(8,-1);
	},
	/**
	 * 检测是否为类数组对象
	 * 比如arguments和document.getElementsByTagName返回的 都是类数组对象
	 * @param {} o
	 */
	isArrayLike:function(o){
		if(o&&
		   typeof o === "object" &&
		   isFinite(o.length) &&
		   o.length >=0 &&
		   o.length === Math.floor(o.length) &&
		   o.length < 4294967296)
		   return true;
		else{
		   return false;
		}
	},
	/**
	 * 批量替换%s
	 * 用法:
	 * var html = "<li><a href=\"%s\">%s</a></li>";
	 * var newHtml = sprintf(html,"http://www.baidu.com","百度一下");
	 * @param text
	 * @returns
	 */
	sprintf:function(text){
		var i=1,args = arguments;
		return text.replace(/%s/g,function(){
			return ( i<args.length )?args[i++]:"";
		});
	}
};
/**
 * 数组sort比较用到的函数
 * 
 * @type
 */
Super.ArrayUtil = {
	/**
	 * 升序比较
	 * 
	 * @param {}
	 *            value1
	 * @param {}
	 *            value2
	 * @return {}
	 */
	compareAsc : function(value1, value2) {
		if (value1 < value2) {
			return -1;
		} else if (value1 > value2) {
			return 1;
		} else {
			return 0;
		}
	},
	/**
	 * 降序比较
	 * 
	 * @param {}
	 *            value1
	 * @param {}
	 *            value2
	 * @return {Number}
	 */
	compareDesc : function(value1, value2) {
		if (value1 < value2) {
			return 1;
		} else if (value1 > value2) {
			return -1;
		} else {
			return 0;
		}
	},
	/**
	 * 复杂对象升序比较
	 * 
	 * @param {}
	 *            propertyName
	 * @return {}
	 */
	objectCompareAsc : function(propertyName) {
		return function(obj1, obj2) {
			var value1 = obj1[propertyName], value2 = obj2[propertyName];
			if (value1 < value2) {
				return -1;
			} else if (value1 > value2) {
				return 1;
			} else {
				return 0;
			}
		};
	},
	/**
	 * 复杂对象降序比较
	 * 
	 * @param {}
	 *            propertyName
	 * @return {}
	 */
	objectCompareDesc : function(propertyName) {
		return function(obj1, obj2) {
			var value1 = obj1[propertyName], value2 = obj2[propertyName];
			if (value1 < value2) {
				return 1;
			} else if (value1 > value2) {
				return -1;
			} else {
				return 0;
			}
		};
	},
	/**
	 * 数据分块处理,对于大的长时间处理的程序有用 
	 * 用的条件:
	 * 1.不需要同步完成。
	 * 2.不需要对顺序有要求的
	 * 3.对数组中每个item运算量较大的.
	 * 例如: 
	 * var data = [12,123,123,3123,3,213,13,1,31,31,3,13,13];
	 * function printValue(item){
	 *        var div = document.getElementById("myDiv"); 
	 *        div.innerHTML+=item+"<br>"; 
	 * }
	 * 为了使元数据保持不变,传入一个data副本
	 * chunk(data.concat(),printValue);
	 * 
	 * @param {}
	 *            array
	 * @param {}
	 *            process
	 * @param {}
	 *            context
	 */
	chunk : function(array, process, context) {
  		setTimeout(function() {
			var item = array.shift();
			process.call(context, item);
			if (array.length > 0) {
				setTimeout(arguments.callee, 100);
			}
		}, 100);
	},
	/**
	 * duff装置,比switch那种快40%;switch写法见 javascript高级程序设计P670
	 * 如果循环次数是定死的.duff装置比普通循环会更快.因为直接访问下标值会更快.
	 * 
	 * @param {}
	 *            array
	 * @param {}
	 *            process
	 * @param {}
	 *            context
	 */
	duff : function(array, process, context) {
		var iterations = Math.floor(array.length / 8);
		var leftover = array.length % 8;
		var i = 0;

		if (leftover > 0) {
			do {
				process.call(context, array[i++]);
			} while (--leftover > 0);
		}

		do {
			process.call(context, array[i++]);
			process.call(context, array[i++]);
			process.call(context, array[i++]);
			process.call(context, array[i++]);
			process.call(context, array[i++]);
			process.call(context, array[i++]);
			process.call(context, array[i++]);
			process.call(context, array[i++]);
		} while (--iterations > 0);
	}
};
/**
 * 事件工具类
 * 
 * @type
 */
Super.EventUtil = {
	/**
	 * 添加事件监听 var btn = document.getElementById("myBtn"); var handler =
	 * function(){ alert("Clicked"); } addHandler(btn,"click",handler);
	 * 
	 * @param {}
	 *            element
	 * @param {}
	 *            type
	 * @param {}
	 *            handler
	 */
	addHandler : function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	/**
	 * 删除事件监听 removeHandler(btn,"click",handler);
	 * 
	 * @param {}
	 *            element
	 * @param {}
	 *            type
	 * @param {}
	 *            handler
	 */
	removeHandler : function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	/**
	 * 返回event对象
	 * 
	 * @param {}
	 *            event
	 * @return {}
	 */
	getEvent : function(event) {
		return event ? event : window.event;
	},
	/**
	 * 获得事件目标
	 * 
	 * @param {}
	 *            event
	 * @return {}
	 */
	getTarget : function(event) {
		return event.target || event.srcElement;
	},
	/**
	 * 获得相关事件目标,只有mouseover和mouseout事件才包含值
	 * 
	 * @param {}
	 *            event
	 * @return {}
	 */
	getRelatedTarget : function(event) {
		if (event.relatedTarget) {
			return event.relatedTarget;
		} else if (event.toElement) {
			return event.toElement;
		} else if (event.fromElement) {
			return event.fromElement;
		} else {
			return null;
		}
	},
	/**
	 * 阻止默认行为
	 * 
	 * @param {}
	 *            event
	 */
	preventDefault : function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	/**
	 * 取消事件冒泡
	 * 
	 * @param {}
	 *            event
	 */
	stopPropagation : function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	/**
	 * 鼠标按钮 0:表示没有按下按钮 1:表示单下了主鼠标按钮 2:表示按下了次鼠标按钮 3:表示同时按下了主，次鼠标按钮 4:表示按下了中间的鼠标按钮
	 * 5:表示按下了主和中间 6:表示按下了次和中间 7:表示按下了主次中3个
	 * 
	 * @param {}
	 *            event
	 * @return {}
	 */
	getButton : function(event) {
		if (document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		} else {
			switch (event.button) {
				case 0 :
				case 1 :
				case 3 :
				case 5 :
				case 7 :
					return 0;
				case 2 :
				case 6 :
					return 6;
				case 4 :
					return 1;
			}
		}
	}
};
/**
 * 错误处理
 * 
 * @type
 */
Super.ErrorUtil = {
	/**
	 * 记录错误日志
	 * 
	 * @param {}
	 *            sev
	 * @param {}
	 *            msg
	 */
	logError : function(url,code, msg) {
		var img = new Image();
		img.src = url+"?code=" + encodeURIComponent(code) + "&msg="
				+ encodeURIComponent(msg);
	},
	/**
	 * 记录日志
	 * 
	 * @param {}
	 *            message
	 */
	log : function(message) {
		if (typeof console == "object") {
			console.log(message);
		} else if (typeof opera == "object") {
			opera.postError(message);
		} else if (typeof java == "object" && typeof java.lang == "object") {
			java.lang.System.out.println(message);
		}
	},
	/**
	 * 断言
	 * 
	 * @param {}
	 *            condition
	 * @param {}
	 *            message
	 */
	assert : function(condition, message) {
		if (!condition) {
			throw new Error(message);
		}
	},
	/**
	 * 设置window级错误监听
	 * 
	 * @param {}
	 *            handler
	 */
	onWindowError : function(handler) {
		window.onerror = function(message, url, line) {
			handler.call(null,message,url,line);
			return false;// 阻止浏览器报告错误
		};
	}
};
/**
 * xml工具
 * 
 * @type
 */
Super.xmlUtil = {
	/**
	 * 解析xml字符串成xmldom
	 * 
	 * @param {}
	 *            xmlStr
	 * @return {}
	 */
	parseXml : function(xmlStr) {
		var xmldom = null;

		if (typeof DOMParser != "undefined") {
			xmldom = (new DOMParser()).parseFromString(xmlStr, "text/xml");
			var errors = xmldom.getElementsByTagName("parsererror");
			if (errors.length) {
				throw new Error("XML parsing error:" + errors[0].textContent);
			}
		} else if (typeof ActiveXObject != "undefined") {
			xmldom = createDocument();
			xmldom.loadXML(xmlStr);
			if (xmldom.parseError != 0) {
				throw new Error("XML parsing error:" + xmldom.parseError.reason);
			}
		} else {
			throw new Error("No XML parser available.");
		}

		return xmldom;
	},
	/**
	 * 将xmldom解析成xmlString
	 * 
	 * @param {}
	 *            xmldom
	 * @return {}
	 */
	serializeXml : function(xmldom) {
		if (typeof XMLSerializer != "undefined") {
			return (new XMLSerializer()).serializeToString(xmldom);
		} else if (typeof xmldom.xml != "undefined") {
			return xmldom.xml;
		} else {
			throw new Error("Could not serialize XML DOM.");
		}
	},
	/**
	 * xpath匹配第一个节点并返回 例如: var result =
	 * selectSingleNode(xmldom.documentElement,"wrox:book/wrox:author",{wrox:"http://www.wrox.com/"});
	 * alert(serializeXml(result));
	 * 
	 * @param {}
	 *            context
	 * @param {}
	 *            expression
	 * @param {}
	 *            namespaces
	 * @return {}
	 */
	selectStringleNode : function(context, expression, namespaces) {
		var doc = (context.nodeType != 9 ? context.ownerDocument : context);

		if (typeof doc.evaluate != "undefined") {
			var nsresolver = null;
			if (namespaces instanceof Object) {
				nsresolver = function(prefix) {
					return namespaces[prefix];
				};
			}
			var result = doc.evaluate(expression, context, nsresolver,
					XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			return (result != null ? result.singleNodeValue : null);
		} else if (typeof context.selectSingleNode != "undefined") {
			if (namespaces instanceof Object) {
				var ns = "";
				for (var prefix in namespaces) {
					if (namespaces.hasOwnProperty(prefix)) {
						ns += "xmlns:" + prefix + "='" + namespaces[prefix]
								+ "' ";
					}
				}
				doc.setProperty("SelectionNamespaces", ns);
			}
			return context.selectSingleNode(expression);
		} else {
			throw new Error("No XPath engine found.");
		}
	},
	/**
	 * xpath匹配多个节点并返回
	 * 
	 * @param {}
	 *            context
	 * @param {}
	 *            expression
	 * @param {}
	 *            namespaces
	 */
	selectNodes : function(context, expression, namespaces) {
		var doc = (context.nodeType != 9 ? context.ownerDocument : context);

		if (typeof doc.evaluate != "undefined") {
			var nsresolver = null;
			if (namespaces instanceof Object) {
				nsresolver = function(prefix) {
					return namespaces[prefix];
				};
			}

			var result = doc.evaluate(expression, context, nsresolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			var nodes = [];
			if (result !== null) {
				for (var i = 0, len = result.snapshotLength; i < len; i++) {
					nodes.push(result.snapshotItem(i));
				}
			}

			return nodes;
		} else if (typeof context.selectNodes != "undefined") {
			if (namespaces instanceof Object) {
				var ns = "";
				for (var prefix in namespaces) {
					if (namespaces.hasOwnPropery(prefix)) {
						ns + "xmlns:" + prefix + "='" + namespaces[prefix]
								+ "' ";
					}
				}
				doc.setProperty("SelectionNamespaces", ns);
			}
			var result = context.selectNodes(expression);
			var nodes = [];

			for (var i = 0, len = result.length; i < len; i++) {
				nodes.push(result[i]);
			}
			return nodes;
		} else {
			throw new Error("No XPath engine found.");
		}
	},
	/**
	 * 通过xslt格式化上下文节点 例如: var result = transform(xmldom,xsltdom);
	 * 
	 * @param {}
	 *            context
	 * @param {}
	 *            xslt
	 * @return {}
	 */
	transform : function(context, xslt) {
		if (typeof XSLTProcessor != "undefined") {
			var processor = new XSLTProcessor();
			processor.importStylesheet(xslt);
			var result = processor.transformToDocument(context);
			return (new XMLSerializer()).serializeToString(result);
		} else if (typeof context.transformNode != "undefined") {
			return context.transformNode(xslt);
		} else {
			throw new Error("No XSLT processor available.");
		}
	}
};
/**
 * 请求工具
 * 
 * @type
 */
Super.RequestUtil = {
	/**
	 * CORS跨域请求 例如: var request =
	 * createCORSRequest("get","http://www.somewhere-else.com/page");
	 * if(request){ request.onload=function(){ //对request.responseText进行处理 };
	 * request.send(); }
	 * 
	 * @param {}
	 *            method
	 * @param {}
	 *            url
	 * @return {}
	 */
	createCORSRequest : function(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			xhr = null;
		}
		return xhr;
	},
	/**
	 * 图片ping服务器方法
	 * 
	 * @param {}
	 *            url
	 * @param {}
	 *            handler
	 */
	imagePing : function(url, handler) {
		var img = new Image();
		img.onload = img.onerror = function() {
			handler();
		};
		img.src = url;
	},
	/**
	 * jsonp跨域,待研究
	 */
	jsonp : function(url,fn) {
		superboojsonp = function (data){
		    fn.call(null,data);
		    superboojsonp=null;
		};
		url += (url.indexOf("?") == -1 ? "?" : "&");
		var script = document.createElement("script");
		script.src = url +"callback=superboojsonp";
		document.body.insertBefore(script, document.body.firstChild);
	}
};
/**
 * cookie工具
 * 
 * @type
 */
Super.CookieUtil = {
	/**
	 * 用法 设置cookie Super.CookieUtil.set("name","Nicholas");
	 * Super.CookieUtil.set("book","Javascript"); 读取cookie
	 * Super.CookieUtil.get("name");//Nicholas
	 * Super.CookieUtil.get("book");//Javascript 删除
	 * Super.CookieUtil.unset("name"); Super.CookieUtil.unset("book");
	 * 
	 * @type
	 */
	get : function(name) {
		var cookieName = encodeURIComponent(name) + "=", 
		    cookieStart = document.cookie.indexOf(cookieName), 
		    cookieValue = null;
		if (cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(";", cookieStart);
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(
					cookieStart + cookieName.length, cookieEnd));
		}
		return cookieValue;
	},
	set : function(name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + "="
				+ encodeURIComponent(value);

		if (expires instanceof Date) {
			cookieText += "; expires=" + expires.toGMTString();
		}

		if (path) {
			cookieText += "; path=" + path;
		}

		if (domain) {
			cookieText += "; domain=" + domain;
		}

		if (secure) {
			cookieText += "; secure";
		}

		document.cookie = cookieText;
	},
	unset : function(name, path, domain, secure) {
		this.set(name, "", new Date(0), path, domain, secure);
	}
};
/**
 * 设置子cookie
 * 
 * @type
 */
Super.SubCookieUtil = {
	/**
	 * 用法 假设document.cookie=data=name=Nicholas&book=Professional%20JavaScript
	 * 取得全部子cookie var data = SubCookieUtil.getAll("data"); data.name;//Nicholas
	 * data.book;//Professional JavaScript 逐个获取
	 * SubCookieUtil.get("data","name");//Nicholas
	 * SubCookieUtil.get("data","book");//Professional JavaScript 设置两个cookie
	 * SubCookieUtil.set("data","name","Nicholas");
	 * SubCookieUtil.set("data","book","Professional JavaScript"); 设置全部
	 * SubCookieUtil.setAll("data",{name:"Nicholas",book:"Professional
	 * JavaScript"},new Date("January 1, 2010")); 修改名字的值,并修改cookie的失效日期
	 * SubCookieUtil.set("data","name","Michael",new Date("February 1,2010"));
	 * 仅删除名字为name的子cookie SubCookieUtil.unset("data","name"); 删除整个cookie
	 * SubCookieUtil.unsetAll("data");
	 * 
	 * @param {}
	 *            name
	 * @param {}
	 *            subName
	 * @return {}
	 */
	get : function(name, subName) {
		// 获取所有子cookie
		var subCookies = this.getAll(name);
		if (subCookies) {
			// 从属性中获取单个子cookie
			return subCookies[subName];
		} else {
			return null;
		}
	},
	getAll : function(name) {
		var cookieName = encodeURIComponent(name) + "=", cookieStart = document.cookie
				.indexOf(cookieName), cookieValue = null, cookieEnd, subCookies, i, parts, len, result = {};
		if (cookieStart > -1) {
			cookieEnd = document.cookie.indexOf(";", cookieStart);
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			// 取出cookie字符串值
			cookieValue = document.cookie.substring(cookieStart
							+ cookieName.length, cookieEnd);
			if (cookieValue.length > 0) {
				// 用&将cookie值分隔成数组
				subCookies = cookieValue.split("&");
				for (i = 0, len = subCookies.length; i < len; i++) {
					// 等号分隔出键值对
					parts = subCookies[i].split("=");
					// 将解码后的兼职对分别作为属性名称和属性值赋给对象
					result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
				}
				return result;
			}
		}
		return null;
	},
	set : function(name, subName, value, expires, path, domain, secure) {
		// 获取当前cookie对象
		var subcookies = this.getAll(name) || {};
		// 单个cookie对应的属性替换
		subcookies[subName] = value;
		// 重新设置cookie
		this.setAll(name, subcookies, expires, path, domain, secure);
	},
	setAll : function(name, subcookies, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + "=", subcookieParts = [], subName;
		// 遍历子cookie对象的属性
		for (subName in subcookies) {
			// 要先检测属性名
			if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {
				// 属性名和属性值编码后=连接为字符串，并放到数组中
				subcookieParts.push(encodeURIComponent(subName) + "="
						+ encodeURIComponent(subcookies[subName]));
			}
		}
		if (subcookieParts.length > 0) {
			// 用&连接子cookie串
			cookieText += subcookieParts.join("&");
			if (expires instanceof Date) {
				cookieText += "; expires=" + expires.toGMTString();
			}
			if (path) {
				cookieText += "; path=" + path;
			}
			if (domain) {
				cookieText += "; domain=" + domain;
			}
			if (secure) {
				cookieText += "; secure";
			}
		} else {
			cookieText += "; expires=" + (new Date(0)).toGMTString();
		}
		// 设置整个cookie
		document.cookie = cookieText;
	},
	unset : function(name, subName, path, domain, secure) {
		// 获取当前cookie对象
		var subcookies = this.getAll(name);
		if (subcookies) {
			// 删除子cookie对应的属性
			delete subcookies[subName];
			// 重新设置cookie
			this.setAll(name, subcookies, null, path, domain, secure);
		}
	},
	unsetAll : function(name, path, domain, secure) {
		this.setAll(name, null, new Date(0), path, domain, secure);
	}
};
/**
 * 内存数组管理器
 */
Super.RamArrayManager = {
				
	//设置缓存数据
	data:[],
	
	//根据id返回一条数据
	find:function(id){
		
		if((!id)||this.data.length===0){
			return null;
		}else{
			var newData = this.data.concat(); 
			
			for(var i=0;i<this.newData.length;i++){
				var row = newData[i];
				if(id===row.id){
					return row;
				}
			}
			return null;
		}
	},
	
	//新增一条数据
	add:function(obj){
		this.data[this.data.length] = obj;
	},
	
	//根据id,删除一条数据
	remove:function(id){
		
		//先得到在数组中的下标
		var newData = this.data.concat(); 
		var index = -1;
		for (var i = 0; i < newData.length; i++) {
			if (newData[i].id === id){
				index = i;
			}
		}
		
		//执行删除
		if(index>-1){
			this.data.splice(index, 1);
		}
	},
	
	//置空数组
	empty:function(){
		this.data.length = 0;
	}
}