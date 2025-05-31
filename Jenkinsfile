pipeline {
  agent any

  


  environment {
    COMPOSE_PROJECT_NAME = "crudtest"
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

    stage('Levantar Contenedores') {
      steps {
        bat '''
        docker-compose down || exit 0
        docker-compose up -d --build
        '''   
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
                rem Configurar entorno Docker para usar Minikube
                call minikube -p minikube docker-env --shell=cmd > minikube_env.bat
                call minikube_env.bat

                rem Construir imagen
                docker build -t %IMAGE_NAME% .
                '''
            }
        }

        stage('Eliminar recursos anteriores') {
            steps {
                bat '''
                echo Eliminando recursos antiguos (si existen)...
                kubectl delete -f secret.yaml --ignore-not-found
                kubectl delete -f deployment.yaml --ignore-not-found
                kubectl delete -f service.yaml --ignore-not-found
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
