pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "crudtest"
  }

  tools {
    nodejs 'node-11.0.0'
  }

  stages {
    stage('Clonar Repositorio') {
      steps {
        git 'https://github.com/LauraGilCamargo/crudtest.git'
      }
    }

    stage('Levantar Contenedores') {
      steps {
        sh 'docker-compose down || true' // parar si ya están corriendo
        sh 'docker-compose up -d --build'
      }
    }

    stage('Esperar Backend') {
      steps {
        // Espera que el backend esté disponible
        sh '''
        for i in {1..10}; do
          nc -zv localhost 5000 && echo "Backend disponible" && exit 0
          echo "Esperando backend..."
          sleep 5
        done
        echo "Backend no responde"
        exit 1
        '''
      }
    }

    stage('Test (opcional)') {
      when {
        expression { fileExists('jenkins-tests/package.json') }
      }
      steps {
        sh 'cd jenkins-tests && npm install && npm test'
      }
    }
  }

  post {
    always {
      echo 'Deteniendo contenedores...'
      sh 'docker-compose down'
    }
  }
}
