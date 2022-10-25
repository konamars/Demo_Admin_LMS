pipeline {
    agent any

    stages {
       
        stage('Docker BUILD image & Push to S3 bucket') {
            steps {
                sh 'docker build -t admin .'
            }
        }
    }
}
