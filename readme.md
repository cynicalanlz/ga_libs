#Analytics install for Qasabo using requirejs


##done

**Минифицирован jquery
**Скрипты из body вынесены в main.js и layout-logic.js

##to-do:

**Проверить правильность переноса кода.
**Проверить зависимости
**Установить на продакшен

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

cd v13 && 
npm install &&
grunt

```

