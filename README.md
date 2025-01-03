project/
├── shell-command-entrypoint/ 
├── nginx/ 
├── unicorn-backend/         
├── unicorn-frontend/        
└── docker-compose.yml
└── Dockerfile_Backend
└── Dockerfile_frontend

### Compose way Run
```
docker-compose up --build
```

### Build Image
```
docker build -t your-dockerhub-username/unicorn-backend .
```
### Push your Image to Docker-hub
```
docker push your-dockerhub-username/unicorn-backend
```
### Run Image
```
docker run -p 8888:80 -p 8000:8000 your-dockerhub-username/unicorn-backend

OR

docker run -p 8888:80 your-dockerhub-username/unicorn-backend sh -c "php artisan serve --host=0.0.0.0 --port=8000"
```

### Frontend app Dev mode run
```
docker build -t unicorn-frontend:dev --target dev .
docker run -p 5173:5173 unicorn-frontend:dev
```
### Frontend app Production mode run
```
docker build -t unicorn-frontend:prod --target prod .
docker run -p 80:80 unicorn-frontend:prod
```

update main file and update backend url