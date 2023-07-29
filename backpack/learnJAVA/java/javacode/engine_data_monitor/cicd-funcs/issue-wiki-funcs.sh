#!/bin/sh

# -------------include other function file--------------

# -------------- Main Function --------------

function sync_issue_board() {
    if test "${CI_COMMIT_REF_NAME}" == "master"; then

        commit_message=$(git log -1 --pretty=%B)

        IFS=',' read -ra AR <<<"$commit_message"
        IFS=';' read -ra issue_ids <<<"$AR"

        for i in "${issue_ids[@]}"; do
            issue_id=$(echo $i | xargs)

            issue_info=$(curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues/${issue_id}")
            state=$(echo $issue_info | jq -r ".state")

            if [ "${state}" == "opened" ]; then
                echo "update issue [${issue_id}] to fix"
                version_date=$(date +"%Y%m%d")
                echo "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues/${issue_id}?labels=${LABEL_FIX}&description=${version_date},${SYS_VER}"
                curl --request PUT --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues/${issue_id}?labels=${LABEL_FIX}&description=${version_date},${SYS_VER}"
                echo "update issue [${issue_id}] done"
            fi

        done
    elif test "${CI_COMMIT_REF_NAME}" == "pre-production"; then
        project_fix_issues=$(curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues?labels=${LABEL_FIX}")
        issues=$(echo $project_fix_issues | jq -r ".[] | @base64")
        for issue in $issues; do
            issue_data=$(echo $issue | base64 -d)
            issue_id=$(echo $issue_data | jq -r ".iid")
            echo "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues/${issue_id}?labels=${LABEL_TESTING}"
            curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" -XPUT "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues/${issue_id}?labels=${LABEL_TESTING}"
        done
    fi

}

function init_issueborad() {
    curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues?title=cicd_implement"

    ongoingLabelCreateInfo=$(curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/labels?name=${LABEL_ONGOING}&color=black")
    ongoingLabelId=$(echo $ongoingLabelCreateInfo | jq -r ".id")

    fixLabelCreateInfo=$(curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/labels?name=${LABEL_FIX}&color=black")
    fixLabelId=$(echo $fixLabelCreateInfo | jq -r ".id")

    testingLabelCreateInfo=$(curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/labels?name=${LABEL_TESTING}&color=black")
    testingLabelId=$(echo $fixLabelCreateInfo | jq -r ".id")

    issueBoardInfo=$(curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/boards")
    defaultIssueBoardId=$(echo $issueBoardInfo | jq -r ".[0].id")

    curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/boards/${defaultIssueBoardId}/lists?label_id=${ongoingLabelId}"
    curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/boards/${defaultIssueBoardId}/lists?label_id=${fixLabelId}"
    curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/boards/${defaultIssueBoardId}/lists?label_id=${testingLabelId}"

    echo "Binding labels to board[${defaultIssueBoardId}]"
}

function create_wiki_page() {
    today=$(date +"%Y%m%d")
    echo "Create at : ${today} <br /> <br />" >temp.md

    project_fix_issues=$(curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues?labels=${LABEL_TESTING}")
    issues=$(echo $project_fix_issues | jq -r ".[] | @base64")
    for issue in $issues; do
        issue_data=$(echo $issue | base64 -d)
        issue_id=$(echo $issue_data | jq -r ".iid")
        issue_title=$(echo $issue_data | jq -r ".title")
        description=$(echo $issue_data | jq -r ".description")

        echo "#${issue_id} ${description} ${issue_title} <br/>" >>temp.md
    done

    wiki_content=$(cat temp.md)
    wiki_page_title="${CURRENT_QAS_VERSION}"
    curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" -XPOST "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/wikis" -d "title=${wiki_page_title}&content=${wiki_content}"
}

function close_alltesting_issue() {
    project_fix_issues=$(curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues?labels=${LABEL_TESTING}")
    issues=$(echo $project_fix_issues | jq -r ".[] | @base64")
    for issue in $issues; do
        issue_data=$(echo $issue | base64 -d)
        issue_id=$(echo $issue_data | jq -r ".iid")
        echo "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues/${issue_id}?labels=&state_event=close"
        curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" -XPUT "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/issues/${issue_id}?labels=&state_event=close"
    done
}



