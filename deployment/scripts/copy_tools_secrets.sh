#!/bin/bash

S3_PATH=$1
LOCAL_PATH=$2

help(){
    echo "Usage:"
    echo "access_tool_scecrets.sh <S3_PATH> <LOCAL_PATH>"
    echo "<S3_PATH>:        Path of the S3 bucket and child directories (e.g.: tools-secrets/id_rsa)"
    echo "<LOCAL_PATH>:     Path of the local destination for the file (e.g.: deployment/git)"
}

if [ -z "${S3_PATH}" ] || [ -z "${LOCAL_PATH}" ]; then
    help
    exit
fi

echo  "Copying ${S3_PATH} into ${LOCAL_PATH}"

# Acquire temporary credentials to assume IAM role for S3 access
AWS_TMP_CREDS=$(aws sts assume-role --role-arn arn:aws:iam::318658205870:role/aws-elasticbeanstalk-ec2-role --role-session-name  "TVE")
export AWS_SECRET_ACCESS_KEY=$(echo $AWS_TMP_CREDS | awk -F, '{print $3}'| awk -F': ' '{print $3}'| sed 's/\"//g')
export AWS_ACCESS_KEY_ID=$(echo $AWS_TMP_CREDS | awk -F, '{print $6}'| awk -F': ' '{print $2}' | awk -F' }' '{print $1}'| sed 's/\"//g')
export AWS_SESSION_TOKEN=$(echo $AWS_TMP_CREDS | awk -F, '{print $4}'| awk -F': ' '{print $2}'| sed 's/\"//g')

/usr/local/bin/aws s3 cp s3://${S3_PATH} ${LOCAL_PATH}
