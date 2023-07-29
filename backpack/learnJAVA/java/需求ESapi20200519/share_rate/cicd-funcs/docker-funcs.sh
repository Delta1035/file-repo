#!/bin/sh

# -------------include other function file--------------

# -------------- Main Function --------------

# Get Build & test docker image, then push to Harbor
# master/fix- of Source project: Build image by version
# others: No need to build image
function docker_build() {

    # Get SYS_VER from artifact: build-vars.sh
    version="${SYS_VER}"
    echo "(Input) Version: ${version}"

    # Get SYS_VER_S from artifact: build-vars.sh
    version_s="${SYS_VER_S}"
    if test "${version_s}" != ""; then echo "(Input) Version_s: ${version_s}"; fi

    echo "Begin: docker_build()"

    echo "1: Check input"

    # Check if Gitlab CI/CD variables been set.
    echo "1.1: Check Gitlab CI/CD vars"
    if ! check_vars "GITLAB_KEY" "${GITLAB_KEY}" ""; then exit 0; fi
    if ! check_vars "VERSION_FILE" "${VERSION_FILE}" ""; then exit 0; fi
    if ! check_vars "version" "${version}" ""; then exit 0; fi

    # Skip process if it's conflict commit
    echo "1.2: Check if it's conflict commit"
    current_commit=$(get_commit_info "${CI_COMMIT_SHORT_SHA}")
    conflict_commit=$(get_conflict_commit "${current_commit}")
    if test "$conflict_commit" != ""; then

        # Save version to file for artifact usage
        echo "export SYS_VER="NA";" >>build-vars.sh

        # exit process
        echo "Skip process for conflict commit, exit"
        exit 0
    fi

    echo "End 1: Check pass."

    echo "2: Get branch"

    # Get current branch type (master, production, pre-production, or fix-)
    get_branch "${CI_COMMIT_REF_NAME}" branch

    echo "End 2: Branch: ${branch}"

    echo "3: Define docker tag"

    # Define docker tag by branch
    get_docker_tag ${branch} tag

    echo "End3: Docker tag: ${tag}"

    echo "4. Save version to file"

    # Save version to file as version info. in container
    echo "${version}" >>${VERSION_FILE}

    echo "End 4"

    echo "5. Build and push image"

    if test "${branch}" == "master" || test "${CI_MERGE_REQUEST_TARGET_BRANCH_NAME}" == "pre-production" || test "${CI_MERGE_REQUEST_TARGET_BRANCH_NAME}" == "production"; then

        # Check if Harbor related Gitlab CI/CD variables been set.
        echo "5.1: Check Harbor related Gitlab CI/CD vars and version_s"
        if ! check_vars "HARBOR_PROJECT" "${HARBOR_PROJECT}" ""; then exit 0; fi
        if ! check_vars "HARBOR_URL" "${HARBOR_URL}" ""; then exit 0; fi
        if ! check_vars "HARBOR_USER" "${HARBOR_USER}" ""; then exit 0; fi
        if ! check_vars "HARBOR_PASSWORD" "${HARBOR_PASSWORD}" ""; then exit 0; fi

        # Build & test Docker image
        echo "5.2: Create Docker image"
        create_image ${tag}
        
        # Push image to harbor
        echo "5.3: Push image to harbor"
        push_image ${tag}

        # Update version & tag to Gitlab CI/CD variables
        echo "5.4: Update Gitlab variables"
        update_git_version ${branch} ${version} ${version_s}
    fi

    echo "End 5"

    echo "End: docker_build()"
}

# Retag docker image
# Input $1: version (docker image tag)
function retag() {

    echo "Begin: retag"

    image_name="${BUILD_IMAGE_NAME}"
    version="${SYS_VER}"
    echo "image name: ${BUILD_IMAGE_NAME}"

    if test "${CI_COMMIT_REF_NAME}" == "pre-production"; then
        echo "${CI_COMMIT_REF_NAME}: retag qas ${image_name}:${version}"
        curl -L -X POST -u "${HARBOR_USER}:${HARBOR_PASSWORD}" --header "Content-Type: application/json" "${HARBOR_URL}/api/v2.0/projects/${HARBOR_PROJECT}/repositories/${BUILD_IMAGE_NAME}/artifacts/${version}/tags" -d "{\"name\": \"${version}.qas\"}"
    elif test "${CI_COMMIT_REF_NAME}" == "production" && test "${ENABLE_ITSM}" != "Y";  then
        echo "${CI_COMMIT_REF_NAME}: retag prd ${image_name}:${version}"
            curl -L -X POST -u "${HARBOR_USER}:${HARBOR_PASSWORD}" --header "Content-Type: application/json" "${HARBOR_URL}/api/v2.0/projects/${HARBOR_PROJECT}/repositories/${BUILD_IMAGE_NAME}/artifacts/${version}/tags" -d "{\"name\": \"${version}.prd\"}"
    elif test "${CI_COMMIT_REF_NAME}" == "production" && test "${ENABLE_ITSM}" == "Y"; then
        echo "ITSM enable mode"
        echo "${CI_COMMIT_REF_NAME}: retag prd ${image_name}:${WAITING_ITSM_APPROVED_VER}"
            curl -L -X POST -u "${HARBOR_USER}:${HARBOR_PASSWORD}" --header "Content-Type: application/json" "${HARBOR_URL}/api/v2.0/projects/${HARBOR_PROJECT}/repositories/${BUILD_IMAGE_NAME}/artifacts/${WAITING_ITSM_APPROVED_VER}/tags" -d "{\"name\": \"${WAITING_ITSM_APPROVED_VER}.prd\"}"
    elif test "${CI_COMMIT_REF_NAME}" == "master"; then
       echo "branch master, skip retag"
    fi

    echo "End: retag"
}

# ----------------- Sub function: docker_build ------------------------

# Define docker tag by branch
# Input $1: current branch
# Output $2: docker tag
function get_docker_tag() {

    echo "CI_MERGE_REQUEST_SOURCE_BRANCH_NAME: $CI_MERGE_REQUEST_SOURCE_BRANCH_NAME"
    echo "CI_MERGE_REQUEST_TARGET_BRANCH_NAME: $CI_MERGE_REQUEST_TARGET_BRANCH_NAME"

    if test "$1" == "master"; then

        # Assign tag as version
        eval $2=${version}

    elif test "${branch}" == "pre-production"; then

        # pre-production use master image instead of create it's own
        echo "QAS no need to build image."
        eval $2="NA"

    elif test "${branch}" == "production"; then

        # pre-production use master image instead of create it's own
        echo "PRD no need to build image."
        eval $2="NA"

    elif test "${branch}" == "fix-"; then

        # Assign tag as hotfix version
        eval $2=${version}
    elif test "$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME" != "master" && test "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME" == "pre-production"; then
        eval $2=${version}
    elif test "$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME" != "pre-production" && test "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME" == "production"; then
        eval $2=${version}
    fi
}

# Build & test Docker image
# Input $1: Docker image tag
function create_image() {

    # Build image
    echo "Build image"
    docker build -t ${BUILD_IMAGE_NAME}:${1} --rm=true .

    # Test image when goss.yaml exists
    if [ -f "goss.yaml" ]; then

        echo "Testing image..."

        if test "${TEST_PORT}" != ""; then

            echo "Port Working？"
            GOSS_FILES_STRATEGY=cp dgoss run -p ${TEST_PORT} ${BUILD_IMAGE_NAME}:${1}
        else

            echo "Job Running？"
            GOSS_FILES_STRATEGY=cp dgoss run ${BUILD_IMAGE_NAME}:${1}
        fi

        echo "Testing image OK"

    else
        echo "goss.yaml not exists. Skip image test."
    fi
}

# Push image to harbor
# Input $1: Docker image tag
function push_image() {

    #tag image
    echo "tag image"
    docker tag ${BUILD_IMAGE_NAME}:${1} ${HARBOR_URL}/${HARBOR_PROJECT}/${BUILD_IMAGE_NAME}:${1}

    echo "$HARBOR_PASSWORD" | docker login -u "$HARBOR_USER" --password-stdin ${HARBOR_URL}

    #push image
    echo "push image"
    docker push ${HARBOR_URL}/${HARBOR_PROJECT}/${BUILD_IMAGE_NAME}:${1}

}

# Update version & tag to Gitlab CI/CD variables
# Input $1: Branch of current commit (master, production, pre-production, fix)
# Input $2: version
# Input $3: small version (VER_S in Gitlab)
function update_git_version() {

    if test "${1}" == "master"; then

        echo "master: update VER_S & tag"

        # Block if small version not set
        if ! check_vars "version_s" "${3}" ""; then exit 0; fi

        # Update VER_S to Gitlab
        curl --request PUT --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/variables/VER_S" --form "value=${3}"

        # Create tag by version to Gitlab
        curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags?tag_name=${2}&ref=${CI_COMMIT_REF_NAME}"

    elif test "${1}" == "fix-"; then

        echo "fix-: update tag"

        # Create tag by version to Gitlab
        curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags?tag_name=${2}&ref=${CI_COMMIT_REF_NAME}"

    else

        # No need to update due to there's no new version been created
        echo "${1}: No need to update"

    fi
}

