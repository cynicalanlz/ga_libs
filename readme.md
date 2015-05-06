#Analytics 4 Qasabo


##done

+ Минифицирован jquery
+ Скрипты из body вынесены в main.js и layout-logic.js
+ Загрузка скриптов теперь асинхронная

##to-do:

+ Проверить правильность переноса кода.
+ Проверить зависимости тут https://github.com/cynicalanlz/ga_libs/blob/require-qasabo/js/analytics/config/preload_qasabo.js#L110-L145
+ Убрать неактуальные зависимости
+ Установить на продакшен

##production installation

```
cd ~
git clone -b require-qasabo http://git@github.com/cynicalanlz/ga_libs
cd ga_libs
mv js/analytics/ /var/www/js/analytics
mv js/main.js /var/www/js/
mv js/jquery_min.js

```

##dev environment

```

#/bin/bash

sudo apt-get install apache2
cd v13 
npm install
grunt

```

