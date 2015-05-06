#Analytics install for Qasabo using requirejs


##done

+ Минифицирован jquery
+ Скрипты из body вынесены в main.js и layout-logic.js
+ Загрузка скриптов теперь асинхронная

##to-do:

+ Проверить правильность переноса кода.
+ Проверить зависимости
+ Убрать неактуальные зависимости
+ Установить на продакшен

##production installation

```

wget https://github.com/cynicalanlz/ga_libs/archive/require-qasabo.zip
tar zxvf require-qasabo.zip
mv js/analytics/ /var/www/js/analytics
mv js/main.js /var/www/js/

```

##dev environment

```

#/bin/bash

sudo apt-get install apache2
cd v13 
npm install
grunt

```

