/*
 *   CountDown 1.0
 *
 *   Javascript源生倒计时（时分秒）插件,自动个位补零
 *   
 *   http://linshi.mbwxzx.com/zt/countdown/
 *   
 *   author : Mr Cui
 *
 *   此插件只做倒计时效果参考，可扩展空间极大，各位同仁轻拍,欢迎指正纠错,联系QQ：764028466
*/

function Count(o){
    var self = this, 
        djs = document.querySelectorAll(o.container),   
 	    interval = o.intervals,
 	    tabClass = o.changename != undefined ? o.changename : null,
   	    timed = null;

    for(var i = 0; i < djs.length; i++){  	
    	timed = djs[i].getAttribute('ctime');
    	(function(){ Countdown(djs[i],timed); })(djs[i],timed);
    }

	function Countdown(obj,odate){
     	var hours = 0, minutes = 0, seconds = 0, millisecond = 0,   //时、分、秒、毫秒
     	    t = null,
     	    nowTime = new Date(),                                   //当前时间
     	    endTime = new Date(odate),                              //结束时间
     	    differ  = endTime.getTime() - nowTime.getTime();        //时间差，单位（毫秒）

        function zeroize(num){                                      //补零
		    num = num < 10 ? '0'+num : num;
		    return num;
		}
        
        clearTimeout(t);
        
     	if(differ > 0){            
            seconds = zeroize(Math.floor(differ/1000%60));
            if(interval == 10){                                     //判断执行时间是否为10毫秒，此处判断根据项目需求更改           	
            	minutes       = zeroize(Math.floor(differ/1000/60));
            	millisecond   = Math.floor(differ%1000).toFixed(0);   
                millisecond   = millisecond.substr(0,2);
                obj.innerHTML = '<span>'+minutes+'</span><a>:</a><span>'+seconds+'</span><a>:</a><span>'+millisecond+'</span>';    
            }else{            	
            	hours         = zeroize(Math.floor(differ/1000/60/60));
            	minutes       = zeroize(Math.floor(differ/1000/60%60));
            	obj.innerHTML = '<span>'+hours+'</span><a>:</a><span>'+minutes+'</span><a>:</a><span>'+seconds+'</span>';            	
            }
            t = setTimeout(function(){Countdown(obj,odate)},interval);  
            
     	}else{
     		if(tabClass != null){                                   //是否需要添加新类名，用以改变倒计时容器样式                
     			obj.classList.add(tabClass);
     		}
     		obj.innerHTML = '倒计时已结束';
     	}
    }      	
}