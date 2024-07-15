### 1. To install playwright we need node to be installed.

### 2. Then we can do `npm init playwright<version>` to install playwright of specific version. If version is not provided then it will install latest version.

### 3. This is a project of playwright with js, so at the time of installation I have selected JavaScript option.

### `npx playwright test <testFileName> --headed`

### How to setup Playwright Pipeline with Jenkins

1. First, run jenkins in your local or, in as a docker image. It by default opens in <a href="http://localhost:8080">localhost:8080</a>.
2. Go to Manage Jenkins > Plugins > Available Plugins and install NodeJS Plugin
3. Go to Manage Jenkins > Tools > NodeJS Installation > Setup.
4. Go to Dashboard > New Item > Pipeline > <Name_Pipeline> > Save
5. Now in the config file configure the following these steps:

    I. <img src= "img/Step1.png">
    II. <img src= "img/Step2.png">
    III. <img src= "img/Step3.png">
    IV. <img src= "img/Step4.png">
    V. Apply and Save.

6. Now Manually Hit the Build Now button and Sit back & Relax.

7. Now as I was having some issues with jenkins, running directly from commands, so I have created a `command.sh` file, where I have give all the commands at the same time.

8. Then create a JenkinsFile:
```
pipeline {
  agent any
    tools {
        nodejs "node" // Ensure this matches the NodeJS installation name configured in Jenkins
    }
  stages {
    stage('Install playwright and running tests') {
      steps {
        sh '''
            chmod +x command.sh
            ./command.sh
        '''
      }
    }
    stage('Reporting') {
      steps {
        sh '''
          echo "Generating Reports! Yup all the test cases are executed."
        '''
      }
      post {
        always {
            // Uploading artifacts
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }
      }
    }
  }
}
```