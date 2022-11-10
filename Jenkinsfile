pipeline {
    agent any

    stages {
        stage('Slack Notification') {
            steps {
                script {
                    slackSend channel: ' sandeep-latest', message: 'slackSend "started ${env.JOB_NAME} ${env.BUILD_NUMBER} (<http://18.144.62.121:8080/job/sandeep-frontend/${env.BUILD_URL}|Open>)"', teamDomain: 'internship-2022-hq', tokenCredentialId: 'slack'
                }
            }
        }
        stage('Docker BUILD image & Push to S3 bucket') {
            steps {
                sh 'docker build -t admin .'
            }
        }
    }
}
