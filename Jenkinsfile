pipeline {
    agent any

    stages {
        stage('slack') {
            steps {
              script {
                slackSend channel: 'konamars-sandeep', color: 'good', message: 'slack updates', teamDomain: 'lms-10f2530', tokenCredentialId: 'f584176b-c728-4889-ac97-a82f20b5081a'
                        mail bcc: '', body: "Please click on the below link to review and approve deployment (<http://52.39.109.160:8080//job/frontend-lms/configure/${env.BUILD_NUMBER}/console>)", cc: '', from: '', replyTo: '', subject: 'Need approval to deploy', to: 'sandeepkumarpunna222@gmail.com'
                        input id: 'Deploygate', message: "Deploy ${env.JOB_NAME}?",
                        }
            }
        }
    }
        stage('Docker BUILD image & Push to S3 bucket') {
            steps {
                sh 'docker build -t frontend .'
            }
        }
    }
}
