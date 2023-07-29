#!/bin/sh

# -------------include other function file--------------

# -------------- Main Function --------------

# Update Rancher settings
# Optional input $1: If custom K8S vars (true/false)
function cd_update() {

    # Get SYS_VER from artifact: build-vars-docker_build.sh
    version="${SYS_VER}"
    echo "(Input) Version: ${version}"

    # Get custom_k8s_vars flag from yml
    if test "${1}" == "true"; then
        custom_k8s_vars="true"
    else
        custom_k8s_vars="false"
    fi
    echo "(Input) custom_k8s_vars: ${custom_k8s_vars}"

    echo "Begin: cd_update()"

    echo "1: Check input"

    # Check if Gitlab CI/CD variables and version been set.
    echo "1.1: Check Gitlab CI/CD vars and version"
    if ! check_vars "GITLAB_KEY" "${GITLAB_KEY}" ""; then exit 0; fi
    if ! check_vars "BUILD_IMAGE_NAME" "${BUILD_IMAGE_NAME}" ""; then exit 0; fi
    if ! check_vars "HARBOR_URL" "${HARBOR_URL}" ""; then exit 0; fi
    if ! check_vars "HARBOR_PROJECT" "${HARBOR_PROJECT}" ""; then exit 0; fi
    if ! check_vars "version" "${version}" ""; then exit 0; fi

    # Skip process if it's conflict commit
    echo "1.2: Check if it's conflict commit"
    current_commit=$(get_commit_info "${CI_COMMIT_SHORT_SHA}")
    conflict_commit=$(get_conflict_commit "${current_commit}")
    if test "$conflict_commit" != ""; then
        echo "Skip process for conflict commit, exit"
        exit 0
    fi

    # Skip cd_update if version if NA
    echo "1.3: Check if it's NA version"
    if test "${version}" == "NA"; then
        echo "No New Version to update, exit"
        exit 0
    fi

    echo "End 1: Check pass."

    echo "2: Get branch"

    # Get current branch type (master, production, pre-production, or fix-)
    get_branch "${CI_COMMIT_REF_NAME}" branch

    echo "End 2: Branch: ${branch}"

    echo "3: Define K8S env. by branch"

    # If custom_k8s_vars is true, K8S related vars should be assigned before call cd_update()
    if test "${custom_k8s_vars}" != "true"; then

        # Set below K8S related vars: K8S_API, K8S_KEY, CFG_VERSION_RECORD, CONFIG_LATEST, LATEST_VAR, RECORD_VAR
        echo "Set K8S related vars by branch"
        set_k8s_vars ${branch}

    fi

    # Check if K8S related vars exists
    echo "Check K8S related vars"
    if ! check_vars "K8S_API" "${K8S_API}" ""; then exit 0; else echo "K8S_API: $K8S_API"; fi
    if ! check_vars "K8S_KEY" "${K8S_KEY}" ""; then exit 0; else echo "K8S_KEY: $K8S_KEY"; fi
    if ! check_vars "CFG_VERSION_RECORD" "${CFG_VERSION_RECORD}" ""; then exit 0; else echo "CFG_VERSION_RECORD: $CFG_VERSION_RECORD"; fi
    if ! check_vars "CONFIG_LATEST" "${CONFIG_LATEST}" ""; then exit 0; else echo "CONFIG_LATEST: $CONFIG_LATEST"; fi
    if ! check_vars "LATEST_VAR" "${LATEST_VAR}" ""; then exit 0; else echo "LATEST_VAR: $LATEST_VAR"; fi
    if ! check_vars "RECORD_VAR" "${RECORD_VAR}" ""; then exit 0; else echo "RECORD_VAR: $RECORD_VAR"; fi

    echo "End 3"

    echo "4: Get current K8s settings "

    pod_upgrade_body=$(curl -H "Authorization:${K8S_KEY}" -H "Content-Type:application/json" -X GET ${K8S_API})

    if test "${pod_upgrade_body}" == ""; then
        echo "Failed to get current K8S settings. Please check API and token."
        exit 0
    fi

    # Turn on if need to debug in detail
    echo "pod_upgrade_body: ${pod_upgrade_body}"

    # Retrive K8S config, volume, and prior version
    echo "Get current K8S volumes settings"
    cfg=$(jq -r '.volumes' <<<$pod_upgrade_body)
    echo "cfg: $cfg"

    echo "Get current K8S volumeMounts settings"
    vol=$(jq -r '.containers[].volumeMounts' <<<$pod_upgrade_body)
    echo "vol: $vol"

    echo "Get prior version"
    prever=$(jq -r '.containers[0].image | split(":")[1]' <<<$pod_upgrade_body)
    echo "prever: $prever"

    # Turn on if need to debug in detail
    # echo "CFG_VERSION_RECORD: $CFG_VERSION_RECORD"

    echo "check if prior version exists in config record"
    is_version_exists=$(jq --arg key "${prever}" 'has($key)' <<<$CFG_VERSION_RECORD)
    echo "is_version_exists: $is_version_exists"

    echo "End 4"

    echo "5: Update config record/latest config to Gitlab"

    # Split piror version and judge if it's hotfix
    split_ver $prever pv1 pv2 pv3 pv4
    if test "${pv4}" == "0"; then
        hotfix_pre_ver="false"
    else
        hotfix_pre_ver="true"
    fi
    echo "prever: ${pv1}.${pv2}.${pv3}.${pv4}; hotifx:$hotfix_pre_ver"

    # Split current version and judge if it's hotfix
    split_ver $version v1 v2 v3 v4
    if test "${v4}" == "0"; then
        hotfix_current_ver="false"
    else
        hotfix_current_ver="true"
    fi
    echo "version: ${v1}.${v2}.${v3}.${v4}; hotifx:$hotfix_current_ver"

    if test "${hotfix_current_ver}" != "true"; then

        # Check prior version need to update to CONFIG_LATEST
        compare_version ${pv1} ${pv2} ${pv3} ${pv4} ${v1} ${v2} ${v3} ${v4} $is_version_exists is_update_latest_config
        echo "is_update_latest_config: $is_update_latest_config"

        if test "${is_update_latest_config}" == "true"; then

            # Update Latest config to Gitlab with current commit version
            echo "Update current version into latest config"
            update_latest_cfg $version "${cfg}" "${vol}"

        fi

    fi

    if test "${hotfix_pre_ver}" != "true"; then

        echo "Update prior version into config record"
        update_cfg_record $is_version_exists $prever "${cfg}" "${vol}"

    fi

    echo "6: Get latest config"
    if test "${hotfix_current_ver}" != "true"; then

        # 如不是hotfix，找LATEST，更新CONFIG
        ConfigCfg=$(jq '.cfg' <<<$CONFIG_LATEST)
        ConfigVol=$(jq '.vol' <<<$CONFIG_LATEST)

    else

        config_version="${v1}.${v2}.${v3}"
        echo "hotfix version: $version"
        echo "config version: $config_version"

        # 如是hotfix，只抓前三版本號，找RECORD的CONFIG
        ConfigCfg=$(jq --arg key "$config_version" '.[$key].cfg' <<<$CFG_VERSION_RECORD)
        ConfigVol=$(jq --arg key "$config_version" '.[$key].vol' <<<$CFG_VERSION_RECORD)

    fi

    echo "End 6"

    echo "-------------------------------------"
    echo $ConfigCfg
    echo "-------------------------------------"
    echo $ConfigVol
    echo "-------------------------------------"

    echo "7: Update to K8S"

    # prepare script
    pod_upgrade_body=$(jq '.annotations."cattle.io/timestamp"=$newVal' --arg newVal ${CI_JOB_TIMESTAMP} <<<"$pod_upgrade_body")
    pod_upgrade_body=$(jq '.containers[].image=$newVal' --arg newVal ${HARBOR_URL}/${HARBOR_PROJECT}/${BUILD_IMAGE_NAME}:${version} <<<"$pod_upgrade_body")

    # Turn on if need to debug in detail
    # echo "pod_upgrade_body: ${pod_upgrade_body}"

    # Update to K8S
    echo "${pod_upgrade_body}" >json.txt
    curl -H "Authorization:${K8S_KEY}" -H "Content-Type:application/json" -d "@json.txt" -X PUT ${K8S_API}

    echo "End 7"

    echo "End: cd_update()"

}


function update_cd_sandbox() {
    CI_JOB_TIMESTAMP=$(date +"%s")
    pod_upgrade_body=$(curl -H "Authorization:${K8S_KEY}" -H "Content-Type:application/json" -X GET ${K8S_API})
    pod_upgrade_body=$(jq '.annotations."cattle.io/timestamp"=$newVal' --arg newVal ${CI_JOB_TIMESTAMP} <<<"$pod_upgrade_body")
    pod_upgrade_body=$(jq '.containers[].image=$newVal' --arg newVal ${HARBOR_URL}/${HARBOR_PROJECT}/${BUILD_IMAGE_NAME}:${DEV_VERSION} <<<"$pod_upgrade_body")
    echo "${pod_upgrade_body}" >json.txt
    echo "${pod_upgrade_body}"
    curl -H "Authorization:${K8S_KEY}" -H "Content-Type:application/json" -d "@json.txt" -X PUT ${K8S_API}
}

# ----------------- Sub function: cd_update ------------------------

# Set K8S related vars by branch
# Global vars change: K8S_API, K8S_KEY, CFG_VERSION_RECORD, CONFIG_LATEST, LATEST_VAR, RECORD_VAR
function set_k8s_vars() {

    if test "${branch}" == "master"; then
        echo "update DEV Project"
        K8S_API=${K8S_DEV_API}
        K8S_KEY=${K8S_DEV_KEY}
        CFG_VERSION_RECORD=${CFG_RECORD_DEV}
        CONFIG_LATEST=${CFG_LATEST_DEV}
        LATEST_VAR="CFG_LATEST_DEV"
        RECORD_VAR="CFG_RECORD_DEV"

    elif test "${branch}" == "pre-production"; then
        echo "update QAS Project"
        K8S_API=${K8S_QAS_API}
        K8S_KEY=${K8S_QAS_KEY}
        CFG_VERSION_RECORD=${CFG_RECORD_QAS}
        CONFIG_LATEST=${CFG_LATEST_QAS}
        LATEST_VAR="CFG_LATEST_QAS"
        RECORD_VAR="CFG_RECORD_QAS"

    elif test "${branch}" == "fix-"; then
        echo "Hotfix!! update DEV Project"
        K8S_API=${K8S_DEV_API}
        K8S_KEY=${K8S_DEV_KEY}
        CFG_VERSION_RECORD=${CFG_RECORD_DEV}
        CONFIG_LATEST=${CFG_LATEST_DEV}
        LATEST_VAR="CFG_LATEST_DEV"
        RECORD_VAR="CFG_RECORD_DEV"
    
    elif test "${branch}" == "sandbox1-k8s"; then
        echo "update Sandbox1 Project"
        K8S_API=${K8S_SANDBOX1_API}
        K8S_KEY=${K8S_SANDBOX1_KEY}
        CFG_VERSION_RECORD=${CFG_RECORD_PRD}
        CONFIG_LATEST=${CFG_LATEST_PRD}
        LATEST_VAR="CFG_LATEST_PRD"
        RECORD_VAR="CFG_RECORD_PRD"

    elif test "${branch}" == "sandbox2-k8s"; then
        echo "update Sandbox2 Project"
        K8S_API=${K8S_SANDBOX2_API}
        K8S_KEY=${K8S_SANDBOX2_KEY}
        CFG_VERSION_RECORD=${CFG_RECORD_PRD}
        CONFIG_LATEST=${CFG_LATEST_PRD}
        LATEST_VAR="CFG_LATEST_PRD"
        RECORD_VAR="CFG_RECORD_PRD"

    elif test "${branch}" == "production"; then
        echo "update PRD Project"
        K8S_API=${K8S_PRD_API}
        K8S_KEY=${K8S_PRD_KEY}
        CFG_VERSION_RECORD=${CFG_RECORD_PRD}
        CONFIG_LATEST=${CFG_LATEST_PRD}
        LATEST_VAR="CFG_LATEST_PRD"
        RECORD_VAR="CFG_RECORD_PRD"

    else
        echo "No Need to update"
        exit 0
    fi
}

# Update Latest config to Gitlab
# Input $1: current commit version
# Inpit $2: current K8S volumes settings
# Inpit $3: current K8S volumesmounts settings
function update_latest_cfg() {

    # prepare json
    CONFIG_LATEST="{\"VER\":\"$version\",\"cfg\":$cfg,\"vol\":$vol}"
    echo "UPDATE LATEST: CONFIG_LATEST"

    # update to Gitlab
    curl --request PUT --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/variables/${LATEST_VAR}" --form "value=${CONFIG_LATEST}"
}

# Update Latest config to Gitlab
# Input $1: if prior version exists in config record
# Input $2: prior version
# Inpit $3: current K8S volumes settings
# Inpit $4: current K8S volumesmounts settings
function update_cfg_record() {
    # prepare json
    if test "$1" == "false"; then
        echo "Not exsit: Add new"
        CFG_VERSION_RECORD=$(jq --arg key "$2" --argjson value1 "${3}" --argjson value2 "${4}" '. * {($key):{vol:$value2,cfg:$value1}}' <<<$CFG_VERSION_RECORD)
    else
        echo "Exsit: Update"
        CFG_VERSION_RECORD=$(jq --arg key "$2" --argjson value "${3}" '.[$key].cfg=$value' <<<$CFG_VERSION_RECORD)
        CFG_VERSION_RECORD=$(jq --arg key "$2" --argjson value "${4}" '.[$key].vol=$value' <<<$CFG_VERSION_RECORD)

    fi
    echo "CFG_VERSION_RECORD: $CFG_VERSION_RECORD"

    # update to Gitlab
    curl --request PUT --header "PRIVATE-TOKEN:${GITLAB_KEY}" "${CI_SERVER_URL}/api/v4/projects/${CI_PROJECT_ID}/variables/${RECORD_VAR}" --form "value=${CFG_VERSION_RECORD}"
}

# Check if prior version
# Input 1~4: piror version
# Input 5~8: current commit version
# Input 9: if prior version exists in config record
# Output 10: if prior version need to update to latest config
function compare_version() {

    # Defualt as need to update to latest config
    eval "${10}="false""

    if test "${CONFIG_LATEST}" != ""; then

        echo "LATEST CONFIG EXIST!"
        newer="true"

        # versions to compare
        banchmark_vers=($1 $2 $3 $4)
        input_vers=($5 $6 $7 $8)

        # loop every element
        for i in $(seq 0 3); do
            if test "${input_vers[i]}" -lt "${banchmark_vers[i]}"; then

                # Quit when version input less then banchmark (Older verion)
                echo "Check $i: ${input_vers[i]} < ${banchmark_vers[i]}"
                newer="false"
                break

            elif test "${input_vers[i]}" -gt "${banchmark_vers[i]}"; then

                # Quit when version input greater then banchmark (Newer verion)
                echo "Check $i: : ${input_vers[i]} > ${banchmark_vers[i]}"
                newer="true"
                break

            else

                # Continue loop to compare small ver when input equal to banchmark
                echo "Check $i: : ${input_vers[i]} = ${banchmark_vers[i]}"

            fi
        done

        echo "newer: $newer"

        if test "$newer" == "true" && test "$9" == "false"; then
            echo "A Newer version"
            eval "${10}="true""
        fi

    else
        echo "NO LATEST CONFIG"
        # 不存在，表示是最新的
        eval "${10}="true""
    fi
}

# Split version
# Input $1: version
# Output $2: 1st element of version
# Output $3: 2nd element of version
# Output $4: 3rd element of version
# Output $5: 4th element of version
function split_ver() {

    current_ver=$1
    dash="-"

    if [[ $current_ver == *$dash* ]]; then
        current_ver="${current_ver/*$dash/$dash}"
        current_ver=${current_ver:1}
    fi

    # split value
    v1=$(jq -r 'split(".")[0]' <<<"\"$current_ver\"") # "
    v2=$(jq -r 'split(".")[1]' <<<"\"$current_ver\"") # "
    v3=$(jq -r 'split(".")[2]' <<<"\"$current_ver\"") # "
    v4=$(jq -r 'split(".")[3]' <<<"\"$current_ver\"") # "
    if test "${v4}" == "null"; then v4=0; fi

    # return value
    eval "$2=$v1"
    eval "$3=$v2"
    eval "$4=$v3"
    eval "$5=$v4"
}

