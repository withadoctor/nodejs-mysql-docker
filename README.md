# nodejs-mysql-docker
nodejs mysql docker simple example

이 github의 베이스는  
https://github.com/amalendukundu/myonlineedu-nodejs-mysql-docker 이 곳입니다.

## Resources

* [Read MyOnlineEdu Blog for details](https://www.myonlineedu.com/blog/view/14/build-docker-container-for-nodejs-and-mysql-based-application)
* [유튜브](https://youtu.be/RR_oMDp4kEc)

--------------
## 설치 및 실행(docker build)
install.bat

## 실행 or 새로고침(docker up)
run.bat

## 개발
npm run r

## 컨테이너 및 이미지 삭제
uninstall.bat

--------------
# commands
## 볼륨 삭제 - 한 개씩
docker rm -v <container id or name>

## 볼륨 삭제 - 전체
docker volume rm $(docker volume ls -qf dangling=true)

## 컨테이너들
docker container ls

## 이미지들
docker images ls

## 이미지 한 번에 지우기 ... 윈도우에서는 안 먹히나 보다..
docker rmi $(docker images -a -q dangling=true)

## bash
docker exec -it <CONTAINER_id> bash
docker exec -it 9cdff74e9b9b bash

docker exec <CONTAINER_id> ip addr show eth0
docker exec 9cdff74e9b9b ip addr show eth0

## export
docker exec <CONTAINER_id> /usr/bin/mysqldump -u <username> --password=<yourpassword> databasename> backup.sql  
docker exec 9cdff74e9b9b /usr/bin/mysqldump -u moeuser --password=moepass moe_db > backup.sql  

## Backup
docker exec CONTAINER /usr/bin/mysqldump -u root --password=root DATABASE > backup.sql

## Restore
cat backup.sql | docker exec -i CONTAINER /usr/bin/mysql -u root --password=root DATABASE