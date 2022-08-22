pipeline {
    agent any

    stages {
        stage('Slack Notification') {
            steps {
                script {
                    slackSend channel: 'jenkins-pipeline-updates', message: 'slackSend "started ${env.JOB_NAME} ${env.BUILD_NUMBER} (<http://50.16.172.46:8080/job/Kona_LMS_frontEnd/${env.BUILD_NUMBER}/console|Open>)"', teamDomain: 'jenkinspipeli-qm51342', tokenCredentialId: 'slackusernew'
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
