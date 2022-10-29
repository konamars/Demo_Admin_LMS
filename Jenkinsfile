pipeline {
    agent any

    stages {
        stage('Slack Notification') {
            steps {
                script {
                    slackSend channel: 'kona-lms', message: 'slackSend "started ${env.JOB_NAME} ${env.BUILD_NUMBER} (<http://35.91.46.64:8080/job/frontend-lms/${env.BUILD_URL}|Open>)"', teamDomain: 'internship-2022-hq', tokenCredentialId: 'slack-lms'
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
