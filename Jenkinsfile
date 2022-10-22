pipeline {
    agent any

    stages {
        stage('Slack ') {
            steps {
                script {
                     slackSend channel: 'konamars-sandeep', color: 'good', message: 'slack updates', teamDomain: 'lms-10f2530', tokenCredentialId: 'f584176b-c728-4889-ac97-a82f20b5081a' "started ${env.JOB_NAME} ${env.BUILD_NUMBER} (<http://52.39.109.160:8080//job/Kona_LMS_frontEnd/${env.BUILD_NUMBER}/console|Open>)", 
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
