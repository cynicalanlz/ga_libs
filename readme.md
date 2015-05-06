#Analytics install for Qasabo using requirejs

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

