pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "crudtest"
        IMAGE_NAME = "crudtest-image"
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Clonar Repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/LauraGilCamargo/crudtest.git'
            }
        }

       stage('Limpiar entorno anterior') {
            steps {
                 dir('C:/Users/EQUIPO/.jenkins/jobs/Contenedores/workspace') {
                 bat 'docker-compose down --volumes --remove-orphans'
                 }
            }
        }

        stage('Construir y ejecutar Docker Compose') {
            steps {
                bat '''
                docker-compose down
                docker-compose up --build -d
                '''
            }
        }


        stage('Iniciar Minikube') {
            steps {
                bat '''
                    minikube stop
                    minikube start --memory=4096 --cpus=2
                '''
            }
        }

        stage('Configurar entorno Docker con Minikube') {
            steps {
                bat '''
                    echo Configurando entorno Docker de Minikube...
                    minikube -p minikube docker-env --shell powershell > minikube_env.ps1
                    powershell -ExecutionPolicy Bypass -File .\\minikube_env.ps1
                '''
            }
        }

        stage('Construir imágenes Docker') {
            steps {
                bat '''
                    echo Construyendo imagen backend...
                    docker build -t backend-app:latest ./backend

                    echo Construyendo imagen frontend...
                    docker build -t frontend-app:latest ./frontend
                '''
            }
        }

        stage('Aplicar manifiestos Kubernetes') {
            steps {
                bat '''
                    echo Aplicando manifiestos Kubernetes...
                    kubectl apply -f k8s/
                '''
            }
        }

        stage('Verificar estado de Pods') {
            steps {
                bat 'kubectl get pods'
            }
        }

    }

    post {
        failure {
            echo "❌ Algo falló en el pipeline. Verifica los logs."
        }
        success {
            echo "✅ Todo se ejecutó correctamente. ¡Contenedores y Kubernetes activos!"
        }
    }
}

