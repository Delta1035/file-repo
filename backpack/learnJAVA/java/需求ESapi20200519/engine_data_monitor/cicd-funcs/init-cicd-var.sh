#!/bin/sh

# -------------include other function file--------------

# -------------- Main Function --------------

#Check env variables
function check_env() {

    if ! check_vars "GITLAB_KEY" "${GITLAB_KEY}" ""; then
        echo "Please set gitlab key first!!"
        exit -1
    fi

    if ! check_vars "TEMPLATE_VARS_INIT_DONE" "${TEMPLATE_VARS_INIT_DONE}" ""; then
        echo "Template variables not settled , start generate default"
        create_git_variable "TEMPLATE_VARS_INIT_DONE" "true"

        if ! check_vars "HARBOR_URL" "${HARBOR_URL}" ""; then create_git_variable "HARBOR_URL" "harbor.wistron.com"; fi
        if ! check_vars "HARBOR_PASSWORD" "${HARBOR_PASSWORD}" ""; then create_git_variable "HARBOR_PASSWORD" "R%z9vH#s3h"; fi
        if ! check_vars "HARBOR_PROJECT" "${HARBOR_PROJECT}" ""; then create_git_variable "HARBOR_PROJECT" "k8sprdwihi40"; fi
        if ! check_vars "HARBOR_USER" "${HARBOR_USER}" ""; then create_git_variable "HARBOR_USER" "k8si40"; fi
        if ! check_vars "SOURCEPJ" "${SOURCEPJ}" ""; then create_git_variable "SOURCEPJ" "true"; fi
        if ! check_vars "VER_M" "${VER_M}" ""; then create_git_variable "VER_M" "1.0."; fi
        if ! check_vars "VER_S" "${VER_S}" ""; then create_git_variable "VER_S" "0"; fi
        if ! check_vars "CURRENT_QAS_VERSION" "${CURRENT_QAS_VERSION}" ""; then create_git_variable "CURRENT_QAS_VERSION" "leavemeempty"; fi

        if ! check_vars "CFG_LATEST_DEV" "${CFG_LATEST_DEV}" ""; then create_git_variable "CFG_LATEST_DEV" "{}"; fi
        if ! check_vars "CFG_LATEST_QAS" "${CFG_LATEST_QAS}" ""; then create_git_variable "CFG_LATEST_QAS" "{}"; fi
        if ! check_vars "CFG_LATEST_PRD" "${CFG_LATEST_PRD}" ""; then create_git_variable "CFG_LATEST_PRD" "{}"; fi

        if ! check_vars "CFG_RECORD_DEV" "${CFG_RECORD_DEV}" ""; then create_git_variable "CFG_RECORD_DEV" "{}"; fi
        if ! check_vars "CFG_RECORD_QAS" "${CFG_RECORD_QAS}" ""; then create_git_variable "CFG_RECORD_QAS" "{}"; fi
        if ! check_vars "CFG_RECORD_PRD" "${CFG_RECORD_PRD}" ""; then create_git_variable "CFG_RECORD_PRD" "{}"; fi

        if ! check_vars "K8S_DEV_API" "${K8S_DEV_API}" ""; then create_git_variable "K8S_DEV_API" ""; fi
        if ! check_vars "K8S_DEV_KEY" "${K8S_DEV_KEY}" ""; then create_git_variable "K8S_DEV_KEY" ""; fi

        if ! check_vars "K8S_QAS_API" "${K8S_QAS_API}" ""; then create_git_variable "K8S_QAS_API" ""; fi
        if ! check_vars "K8S_QAS_KEY" "${K8S_QAS_KEY}" ""; then create_git_variable "K8S_QAS_KEY" ""; fi

        if ! check_vars "K8S_PRD_API" "${K8S_PRD_API}" ""; then create_git_variable "K8S_PRD_API" ""; fi
        if ! check_vars "K8S_PRD_KEY" "${K8S_PRD_KEY}" ""; then create_git_variable "K8S_PRD_KEY" ""; fi

        if ! check_vars "ENANLE_ISSUEBOARD_SYNC" "${ENANLE_ISSUEBOARD_SYNC}" ""; then create_git_variable "ENANLE_ISSUEBOARD_SYNC" "false"; fi

        init_issueborad

        echo "Generate default variables done."
    fi
}

function injectScriptsPackageJson() {
    curl $1 >setting.json
    setting=$(cat setting.json)
    package_json=$(cat package.json | jq -r '.scripts=$newVal' --argjson newVal "${setting}")
    echo $package_json >package.json
}

function check_required_file() {
    if [ ! -f ${1} ]; then
        echo "File ${1} not exist , download default template !!"
        curl ${2} >${1}
        echo "Default File for ${1} : "
        cat ${1}
    fi
}

function create_git_variable() {
    echo "update variable ${1} = ${2}"
    lable_create_param="{ \"key\": \"${1}\", \"value\": \"${2}\", \"protected\": false, \"masked\": false}"
    echo $lable_create_param
    curl -H "Content-Type:application/json" --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/variables" -d "${lable_create_param}"
}
