<!DOCTYPE html>
<html>
<head>
    <meta content="text/html" charset="utf-8"/>
    <meta content="sdsad" name="description"/>
    <meta content="s2342dsad" name="keywords"/>
    <title>Test</title>        
    <script type="text/javascript">
         <?php            
            $requirejs = getcwd() .'\min\require.min.js';
            $analytics_preload  = getcwd() . '\config\preload_spbren_min.js';               
            if (file_exists($requirejs) && file_exists($analytics_preload)){
                include($requirejs);include($analytics_preload);                
            }          
        ?>
    </script>    
</head>
<body>
<noscript>
    <iframe src="//www.googletagmanager.com/ns.html?id=GTM-5V8S4F" height="0" width="0" style="display:none;visibility:hidden"></iframe>
    <div><img src="//mc.yandex.ru/watch/12251719" style="position:absolute; left:-9999px;" alt="" /></div>
</noscript>
<div id="console" style="background: #aaa; width: 200px; position: fixed; top: 0; right: 0; text-align: center; padding: 20px; line-height: 1; font-family: sans-serif;"></div>
<h1></h1>
<table border="1px solid" style="margin: 19px 0 0 112px; padding: 15px;">
    <tbody>
    <tr><th>Test name</th><th>Result</th></tr>
    <tr><td>UserId from GA</td><td id="uid_out"></td></tr>    
    <tr><td>UserId encoded</td><td id="registrationId"></td></tr>
    <tr><td>UserId decoded</td><td id="uid_dec_out"></td></tr>
    </tbody>
</table>
<div id="top" style="background: #eee; height: 500px">#top</div>
<div id="main" style="background: #ccc; height: 2000px">#main</div>
<div style="background: #999; height: 200px; display: block;"></div>
<img src="http://upload.wikimedia.org/wikipedia/commons/9/92/Big_Sur_Coast_California.JPG"/>
</body>
</html>