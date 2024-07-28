# .DEFAULT_GOAL := say_hello2
# all: say_hello say_hello2

say_hello:
	echo "Hello World"

npm_install_cv_all:
	cd services/ms-cv-craft && npm install && cd ../..

npm_run_cv_local:
	cd services/ms-cv-craft && npm run start:dev && cd ../..

npm_install_cv:
	cd services/ms-cv-craft && npm install $(pkg) && cd ../..

npm_install_dev_cv:
	cd services/ms-cv-craft && npm install $(pkg) --save-dev && cd ../..