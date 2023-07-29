#!/bin/sh

# -------------include other function file--------------

# -------------- Main Function --------------

# Get version of current commit
# master: VER_M + (VER_S + 1)
# pre-production/production: trace parent commits to get version
# fix-: trace parent commits to get master version then create hotfix version
function get_version() {

    echo "Begin: get_version()"

    echo "1: Get branch"

    # Get current branch type (master, production, pre-production, or fix-)
    get_branch "${CI_COMMIT_REF_NAME}" branch

    echo "End 1: Branch: ${branch}"

    # Skip process if it's conflict commit
    echo "2: Check if it's conflict commit"
    current_commit=$(get_commit_info "${CI_COMMIT_SHORT_SHA}")
    conflict_commit=$(get_conflict_commit "${current_commit}")
    if test "$conflict_commit" != ""; then

        # Save version to file for artifact usage
        echo "export SYS_VER="NA";" >build-vars.sh

        # exit process
        echo "Skip process for conflict commit, exit"
        exit 0
    fi
    echo "End 2: Check if it's conflict commit"

    echo "3: Get version by branch"

    # Default version as NA
    version="NA"

    if test "${branch}" == "master"; then

        echo "3.1: Check inputs"

        # Check if Gitlab CI/CD variables been set.
        echo "3.2: Check Gitlab CI/CD vars"
        if ! check_vars "GITLAB_KEY" "${GITLAB_KEY}" ""; then exit 0; fi
        if ! check_vars "VER_M" "${VER_M}" ""; then exit 0; fi
        if ! check_vars "VER_S" "${VER_S}" ""; then exit 0; fi

        echo "End 3.1: Check pass."

        # New version: VER_M + (VER_S + 1)
        next_ver_s=$((${VER_S} + 1))
        version="${VER_M}${next_ver_s}"
        echo "New master version : $version"

    elif test "${branch}" == "fix-"; then

        # Get tags information from Gitlab API
        all_tags=$(get_tags)

        # Get version form existed tag (Deal with branch initial)
        get_existed_ver "${all_tags}" "${CI_COMMIT_SHORT_SHA}" version
        echo "current commit version: $version"

        # If there's no version on cuurent commit, Get version from master (x.x.x)
        if test "${version}" == ""; then
            only_get_master="true"
            get_prior_ver "${all_tags}" "${CI_COMMIT_SHORT_SHA}" "$only_get_master" version
            echo "Parent master version: $version"
        fi

        # Get (count of version: x.x.x) to construct hotfix version
        hotfixver=$(jq -r 'map(select(.name | contains ($newVal))) | length' --arg newVal "$version" <<<"${all_tags}")

        # New hotfix version: x.x.x.x
        version="hotfix-"${version}.$((${hotfixver}))
        echo "New hotfix version: $version"

    elif test "${branch}" == "production" && test "${ENABLE_ITSM}" == "Y" && test "$CI_PIPELINE_SOURCE" != "schedule" && test "$CI_PIPELINE_SOURCE" != "trigger" && test "$CI_PIPELINE_SOURCE" != "web" && test "${WAITING_ITSM_APPROVED_VER}" != ""; then
        echo "still have the ITSM ticket (${ITSM_TICKET_NUMBER}) to deal with"
        exit 1

    elif test "${branch}" == "production" && test "${ENABLE_ITSM}" == "Y" && test "${WAITING_ITSM_APPROVED_VER}" != ""; then
        version="${WAITING_ITSM_APPROVED_VER}"
        
    else

        # Get tags information from Gitlab API
        all_tags=$(get_tags)

        # Get version form existed tag (Deal with branch initial)
        get_existed_ver "${all_tags}" "${CI_COMMIT_SHORT_SHA}" version
        echo "current commit version: $version"

        # If there's no version on cuurent commit, Get version from master
        if test "${version}" == ""; then
            only_get_master="false"
            get_prior_ver "${all_tags}" "${CI_COMMIT_SHORT_SHA}" "$only_get_master" version
            echo "Parent version: $version"
        fi
    fi

    echo "End 3: version: ${version}"

    echo "4: Save version to file"

    # Save version to file for artifact usage
    echo "export SYS_VER=${version};" >>build-vars.sh

    if test "${branch}" == "master"; then
        # Save VER_S to file for artifact usage
        echo "export SYS_VER_S=${next_ver_s};" >>build-vars.sh
    fi

    source build-vars.sh
    echo "SYS_VER: ${SYS_VER}"

    echo "End 4"

    echo "End: get_version()"
}

# add version tag for release branch merge into QAS/PRD
function add_version_tag_on_release() {

  IS_CONTINUE="false"
  if test "$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME" != "master" && test "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME" == "pre-production"; then
    IS_CONTINUE="true"
  elif test "$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME" != "pre-production" && test "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME" == "production"; then
    IS_CONTINUE="true"
  fi

  if test "$IS_CONTINUE" != "true"; then
    echo "No release branch case, skip add version tag on release"
  else
    VER_S=$((${VER_S}+1))
    echo ${VER_S}
    TAG="${VER_M}${VER_S}"
    ADD_TAG_API="${GITLAB_API}/repository/tags?tag_name=${TAG}&ref=${CI_COMMIT_SHA}"
    echo ${ADD_TAG_API}
    ADD_TAG=$(curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${ADD_TAG_API}")
    echo "${ADD_TAG}"
    UPD_VER_S_API="${GITLAB_API}/variables/VER_S"
    echo ${UPD_VER_S_API}
    UPD_VER_S=$(curl --request PUT --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${UPD_VER_S_API}" --form "value=${VER_S}")
    echo "${UPD_VER_S}"
    record_git_version
  fi
}



# -------------- Sub Function --------------

# Check if variable been null
# Input $1: key of variable
# Input $2: value of variable
# Input $3: value to compare
function check_vars() {

    if test "${2}" == "${3}"; then
        echo "Check ${1} failed: value is ${3}"
        return 1
    else
        return 0
    fi
}

# Judge branch type of current commit
# Input $1: current commit branch name
# Ouput $2: branch type
function get_branch() {

    ref_name=${1}
    all_branchs=("master" "production" "pre-production" "fix-")

    # defualt ref_name as branch type
    eval "$2=$1"

    for current_branch in "${all_branchs[@]}"; do
        prefix="${ref_name/$current_branch*/$current_branch}"
        if test $prefix == $current_branch; then

            # Set branch type
            eval "$2=$prefix"
            break
        fi
    done

}


# Get current commit info
# Input $1: current commit id
function get_commit_info() {
    url=${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/commits/$1
    echo $(curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" ${url%$'\r'})
}

# Get conflict commit.
# Input $1: current commit info
function get_conflict_commit() {

    # If there's merge conflict, a reverse pipeline will be triggerd (ex production -> pre-production) before normal pipeline
    # Current check logic: If message contains "# Conflicts:"
    # Need future study for better ways to judge if it's reverse pipeline.
    echo $(jq -r 'select(.message|contains("# Conflicts:")) | .id' <<<"${1}")
}

# Get tags information from Gitlab API
# Ouput $1: tags info. from Gitlab API
function get_tags() {

    # Notice:
    # Latest 100 records should be enough.
    # Refers to below link to implement pagination if your project need more records.
    # Reference: https://docs.gitlab.com/ee/api/#pagination
    echo $(curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags?page=1&per_page=100")
}

# Get version form existed tag (Deal with branch initial)
# Input $1: tags info. from Gitlab API
# Input $2: current commit id
# Output $3: matched version in tags info.
function get_existed_ver() {
    eval "$3="$(jq -r 'map(select(.target | contains ($newVal))) | .[] .name' --arg newVal "$2" <<<"$1")""
}

# Get prior version for non-hofix branch
# Input $1: tags info. from Gitlab API
# Input $2: current commit id
# Input $3: If get master only.
# Output $4: matched version in tags info.
function get_prior_ver() {

    echo "Find Parent of $2"

    # Get current commit info from Gitlab API
    current_commit=$(get_commit_info "$2")

    # Get parent commit ids
    parent_commits_ids=$(jq -r '.parent_ids' <<<"${current_commit}")
    echo "parent_commits_ids: $parent_commits_ids"

    # Get last commit id index = lenght - 1
    last_commit_id_index=$(jq '. | length-1' <<<"${parent_commits_ids}")
    last_commit_id_index=${last_commit_id_index%$'\r'}
    echo "last_commit_id_index: $last_commit_id_index"

    # Return if there's no parent commit.
    if test "$last_commit_id_index" == "-1"; then
        echo "No parent commit. VER: NA"
        eval "$4="NA""
        return 0
    fi

    # Get conflict commit.
    conflict_commit=$(get_conflict_commit "${current_commit}")

    if test "$conflict_commit" != ""; then

        # If it's reverse pipeline triggerd by conflict, search first parent_commits_id, which means trace target history
        echo "Reverse pipeline. Trace first parent id (Target history)."
        parent_index=0

    else
        # If it's normal pipeline, search last parent_commits_id, which means trace source history
        echo "Normal pipeline. Trace last parent id (Source history)."
        parent_index=${last_commit_id_index}

    fi

    # Get last parent commit
    parent_commits_id=$(jq -r '.[$newVal|tonumber]' --arg newVal ${parent_index} <<<"${parent_commits_ids}")
    parent_commits_id=${parent_commits_id%$'\r'}
    echo "parent_commits_id: $parent_commits_id"

    # Get prior version
    if test "$3" == "true"; then
        # Get only master version
        parent_ver=$(jq -r 'map(select(.target | contains ($newVal))) | map(select(.name | contains ("hotfix-") | not)) | .[].name' --arg newVal "${parent_commits_id}" <<<"$1")
    else
        # Get master or hotfix version
        parent_ver=$(jq -r 'map(select(.target | contains ($newVal))) | .[].name' --arg newVal "${parent_commits_id}" <<<"$1")
    fi
    parent_ver=${parent_ver%$'\r'}
    echo "parent_ver: $parent_ver"

    # If parent commit has version, return it. Otherwise, keep tracing it's parent
    if test "${parent_ver}" == ""; then
        get_prior_ver "$1" "$parent_commits_id" "$3" parent_ver
    fi

    #return version
    eval "$4="${parent_ver}""
}

function record_git_version() {
    record_git_qas_version
    record_git_prd_version
}

function record_git_qas_version() {
    if test "${CI_COMMIT_REF_NAME}" == "pre-production" || test "${CI_MERGE_REQUEST_TARGET_BRANCH_NAME}" == "pre-production"; then
        version="${SYS_VER}"
        echo "pre-production: update CURRENT_QAS_VERSION"
        curl --request PUT --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/variables/CURRENT_QAS_VERSION" --form "value=${version}"
    fi
}

function record_git_prd_version() {
    if test "${CI_COMMIT_REF_NAME}" == "production" || test "${CI_MERGE_REQUEST_TARGET_BRANCH_NAME}" == "production"; then
        version="${SYS_VER}"
        echo "production: update CURRENT_PRD_VERSION"
        curl --request PUT --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/variables/CURRENT_PRD_VERSION" --form "value=${version}"
    fi
}

