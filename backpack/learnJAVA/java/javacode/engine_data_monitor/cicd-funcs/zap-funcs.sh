#!/bin/sh

# -------------include other function file--------------

# -------------- Main Function --------------

# Zap vulnerability scan
function zap_scan() {
    # Create './report' directory
    if [ -d "./report" ]; then
        echo "Delete ./report folder"
        rm -rf ./report
    fi
    echo "Create ./report folder"

    # Create '/zap/wrk' directory
    if [ -d "/zap/wrk" ]; then
        echo "Delete /zap/wrk folder"
        rm -rf /zap/wrk
    fi
    echo "Create /zap/wrk folder"
    mkdir /zap/wrk

    echo "zap-baseline.py -I -t "http://${SERVICE_NAME}"."${SCAN_URL}" -x zapreport.xml"
    zap-baseline.py -I -t http://${SERVICE_NAME}.${SCAN_URL} -x zapreport.xml
    ls -altr /zap/wrk
    cp -pr /zap/wrk/* ./report.xml
}

