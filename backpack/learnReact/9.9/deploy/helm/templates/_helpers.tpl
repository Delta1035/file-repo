

{{/*
Create lable name and version as used by the chart label.
*/}}
{{- define "webportal.label" -}}
{{- printf "%s-%s" .Chart.Name .Values.site | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}
