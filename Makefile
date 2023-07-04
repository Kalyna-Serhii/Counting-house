up:
	docker-compose up -d
	docker-compose ps
upbuild:
	docker-compose up -d --build
	docker-compose ps
ps:
	docker-compose ps
psa:
	docker-compose ps -a
down:
	docker-compose down --remove-orphans
cli:
	docker exec -ti db_house bash


#run:
#	docker run -d -p 3000:3000 --name app --rm app_image
#start:
#	docker start app
#stop:
#	docker stop app
