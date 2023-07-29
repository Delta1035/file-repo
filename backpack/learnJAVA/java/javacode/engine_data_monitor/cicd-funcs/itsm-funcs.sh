#!/bin/sh

# -------------include other function file--------------

# -------------Main Function --------------


# call ITSM api to issue ticket
function issue_itsm_ticket() {

    echo "Begin: issue_itsm_ticket";

    if test "${ITSM_TICKET_NUMBER}" != ""; then 
      echo "still have the ITSM ticket (${ITSM_TICKET_NUMBER}) to deal with"
      exit 1
    fi
    echo "call itsm api"
    MSG=$(MRmsg -i "${CI_PROJECT_ID}" -t "${GITLAB_KEY}")
    echo $MSG
    mergeID=$(echo $MSG|jq -r '.iid')
    echo $mergeID
    title=$(echo $MSG|jq -r '.title')
    echo $title
    description=$(echo $MSG|jq -r '.description')
    echo $description
    jq -c ".CICDMTP.Title=\"MRID:#${mergeID} ${title}\" | .CICDMTP.Description=\"${description}\" | .CICDMTP.DetailRequirement=\"${description}\"" ./itsm.json > result.json
    cat result.json
    TicketNum=$(itsm ./result.json)
    echo "ITSM ticket number is ${TicketNum}"
    echo "set global variable 'ITSM_TICKET_NUMBER'"
    set_ticket_number "${TicketNum}"
    echo "create tag for waitting"
    tag_itsm_status "waiting"
    echo "End: issue_itsm_ticket";
}

# tag itsm result to commit by itsm callback
function tag_itsm_status() {
    echo "Begin: tag_itsm_status";

    echo "ITSM approval result as: ${isTicketFinish}"
    if test "${isTicketFinish}" == "true"; then
        echo "isTicketFinish is approve"
        approval_status "approve" ""
    elif test "${isTicketFinish}" == "false"; then
        echo "isTicketFinish is deny"
        approval_status "deny" ""
        clear_itsm_status
    else
        echo "isTicketFinish is waitting"
        approval_status "waitting"
    fi
    echo "End: tag_itsm_status";
}

# Get itsm status from gitlab tag checking
function get_itsm_status() {

    echo "Begin: get_itsm_status"

    echo "ITSM ticket: ${ITSM_TICKET_NUMBER}"

    isTicketApproved=$(curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" --url "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags/A-${ITSM_TICKET_NUMBER}")
    echo "isTicketApproved: ${isTicketApproved}"
    
    isTicketDenied=$(curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" --url "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags/D-${ITSM_TICKET_NUMBER}")
    echo "isTicketDenied: ${isTicketDenied}"
    
    isTicketPending=$(curl --header "PRIVATE-TOKEN:${GITLAB_KEY}" --url "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags/W-${ITSM_TICKET_NUMBER}")
    echo "isTicketPending: ${isTicketPending}"

    if test "${isTicketApproved}" == "{\"message\":\"404 Tag Not Found\"}"; then
       isTicketFinish="false"
       if test "${isTicketDenied}" != "{\"message\":\"404 Tag Not Found\"}"; then
         echo "ITSM titket: ${ITSM_TICKET_NUMBER} is denied"
       elif test "${isTicketPending}" != "{\"message\":\"404 Tag Not Found\"}"; then
         echo "ITSM titket: ${ITSM_TICKET_NUMBER} is pending for approval"
       fi
    else
       isTicketFinish="true"
    fi

    echo "isATicketExist: ${isATicketExist}"
    echo "isTicketFinish: ${isTicketFinish}"
    echo "export IS_TICKET_FINISH=${isTicketFinish};" >>build-itsm-vars.sh
    
    source build-itsm-vars.sh
    echo "${IS_TICKET_FINISH}"

    echo "End: get_itsm_status"
}

# check itsm result from get_itsm_result 
function check_itsm_result() {
   echo "Begin: check_itsm_result"


   
   echo "IS_TICKET_FINISH: ${IS_TICKET_FINISH}"
   if test "$CI_COMMIT_REF_NAME" == "production" && test "$ENABLE_ITSM" == "Y"; then
     echo build-itsm-vars.sh
     source build-itsm-vars.sh
     echo "${IS_TICKET_FINISH}"
     if test "$ITSM_TICKET_NUMBER" == ""; then
       echo "ITSM ticket not found, stop further action!"
       exit 1
     elif test "$IS_TICKET_FINISH" != "true"; then     
       echo "Ticket ticket: ${ITSM_TICKET_NUMBER} is not approved, stop further action!"
       exit 1
     fi
   else
     echo "Not branch: production, skip check"
   fi

   echo "End: check_itsm_result"       
}

function clear_itsm_status () {
    echo "Begin: clear_itsm_status"

    # clear itsm ticket
    echo "clear itsm ticket"    
    set_ticket_number ""
    
    # clear itsm apprvoed version
    echo "clear itsm apprvoed version"
    set_itsm_version ""

    echo "End: clear_itsm_status"
}

#--------------Sub Function----------------

function approval_status() {
    echo "ITSM tikect status: ${1}"
    echo "ITSM ticket#: ${ITSM_TICKET_NUMBER} "
    echo "版本: ${SYS_VER}"

    if test "${1}" == "approve"; then
        # Create tag by version to Gitlab
        curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" --url "${GITLAB_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags?tag_name=A-${ITSM_TICKET_NUMBER}&ref=W-${ITSM_TICKET_NUMBER}"
        echo "Add A delete-w"
        curl --request DELETE --header "PRIVATE-TOKEN:${GITLAB_KEY}" --url "${GITLAB_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags/W-${ITSM_TICKET_NUMBER}"        
    elif test "${1}" == "deny"; then
        # Create tag by version to Gitlab
        curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" --url "${GITLAB_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags?tag_name=D-${ITSM_TICKET_NUMBER}&ref=W-${ITSM_TICKET_NUMBER}"
        echo "delete-w add D"
        curl --request DELETE --header "PRIVATE-TOKEN:${GITLAB_KEY}" --url "${GITLAB_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags/W-${ITSM_TICKET_NUMBER}"
    else
        curl --request POST --header "PRIVATE-TOKEN:${GITLAB_KEY}" --url "${GITLAB_URL}/api/v4/projects/${CI_PROJECT_ID}/repository/tags?tag_name=W-${ITSM_TICKET_NUMBER}&ref=${CI_COMMIT_SHA}"
       set_itsm_version "${SYS_VER}"
    fi
}

function set_ticket_number() {
    echo "set gitlab CICD variable: ITSM_TICKET_NUMBER as $1"
    export ITSM_TICKET_NUMBER="${1}"
    curl --request PUT --header "PRIVATE-TOKEN:${GITLAB_KEY}" --form value=$1 --url "${GITLAB_URL}/api/v4/projects/${CI_PROJECT_ID}/variables/ITSM_TICKET_NUMBER"
}

function set_itsm_version() {
    echo "set gitlab CICD variable: ITSM_APPROVED_VER as $1"
    curl --request PUT --header "PRIVATE-TOKEN:${GITLAB_KEY}" --form value="$1" --url "${GITLAB_URL}/api/v4/projects/${CI_PROJECT_ID}/variables/WAITING_ITSM_APPROVED_VER"
}


