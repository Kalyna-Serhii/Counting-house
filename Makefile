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
	docker exec -it db_house psql -U admin


#run:
#	docker run -d -p 3000:3000 --name app --rm app_image
#start:
#	docker start app
#stop:
#	docker stop app
