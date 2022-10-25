pipeline {
    agent any

    stages {
        stage('Slack Notification') {
            steps {
                script {
                    slackSend channel: 'konamars-sandeep', color: 'good', message: 'slack updates', "started ${env.JOB_NAME} ${env.BUILD_NUMBER} (<http://34.210.242.192:8080/job/admin-lms//job/Kona_LMS_frontEnd/${env.BUILD_NUMBER}/console|Open>)"', teamDomain: 'lms-10f2530', tokenCredentialId: 'f584176b-c728-4889-ac97-a82f20b5081a'
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
