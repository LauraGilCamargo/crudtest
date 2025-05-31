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
                dir('C:/Users/EQUIPO/.jenkins/jobs/Contenedores/workspace') {
                    bat 'docker-compose up -d --build'
                }
            }
        }

        stage('Verificar conexión con Kubernetes') {
            steps {
                bat '''
                    echo Verificando conexión con Minikube...
                    kubectl config current-context
                    kubectl get nodes
                '''
            }
        }

        stage('Construir imagen Docker en Minikube') {
            steps {
                bat '''
                    echo Configurando entorno Docker para Minikube...
                    call minikube -p minikube docker-env --shell=cmd > minikube_env.bat
                    call minikube_env.bat

                    echo Construyendo imagen Docker...
                    docker build -t crudtest-image .
                '''
            }
        }

        stage('Desplegar manifiestos') {
            steps {
                bat '''
                    echo Aplicando manifiestos de Kubernetes...
                    kubectl apply -f secret.yaml --validate=false
                    kubectl apply -f deployment.yaml --validate=false
                    kubectl apply -f service.yaml --validate=false
                '''
            }
        }
    }

    post {
        always {
            echo 'Deteniendo contenedores...'
            bat 'docker-compose down'
        }
    }
}
