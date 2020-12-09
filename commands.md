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

## none 이미지들 삭제
docker image prune

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