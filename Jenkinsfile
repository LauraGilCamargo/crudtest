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

    }

    post {
        always {
            echo 'Deteniendo contenedores...'
            bat 'docker-compose down'
        }
    }
}
