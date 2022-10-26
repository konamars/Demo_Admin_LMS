pipeline {
    agent any

    stages {
        stage('Slack Notification') {
            steps {
                script {
                    slackSend channel: 'konamars-sandeep', message: 'slackSend "started ${env.JOB_NAME} ${env.BUILD_NUMBER} (<http://54.245.142.68:8080/job/frontend-lms/${env.BUILD_URL}|Open>)"', teamDomain: 'lms-10f2530', tokenCredentialId: 'f584176b-c728-4889-ac97-a82f20b5081a'
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
